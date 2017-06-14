var Bacon = require('baconjs');
var R = require('ramda');
var Q = require('q');
var V = require('../../utilities/v');

var ProductInfo = require('../../product/stores/product-info');
var ClaimsInteraction = require('./server-claims-store');
var UploadSupport = require('../../../support/upload-support');
var Mapping = require('../../../support/mapping')
var Constants  = require('../../../constants/constants')


function toClientBenefitsListItem(serverBenefitsListItem) {
  var toClient  = {
    "benefit-code": "BenefitCode",
    "cover-cap": "CoverCap",
    "current-cover": "CurrentCover"
  };
  var partialResult = R.reduce(
    function(acc, serverKey) {
      return R.merge(acc, R.createMapEntry( toClient[serverKey], serverBenefitsListItem[serverKey] ));
    },
    {},
    Object.keys(serverBenefitsListItem));

  return R.merge(
    partialResult,
    R.createMapEntry('BenefitClaimType', ProductInfo.getClaimTypeForBenefitCode( partialResult.BenefitCode)));

}

var toBenefitsList = R.lift(toClientBenefitsListItem);


function toClientPolicyListItem(serverPolicyListEntry) {

  var clientPropToServerProp = {
    PolicyNumber: 'policy-number',
    // ProductCode: 'product-code',  // Removed product-code from server. Just added by client.
    PolicyUuid: 'policy-uuid',
    StartDate: 'start-date',
    CancelledDate: 'cancelled-date',
    Status: 'status',
    AmountOfCover: 'amount-of-cover',
    DailyPremium: 'daily-premium',
    EndDate: 'end-date',
    RefundedDate: 'refunded-date',
    DaysInArrearsList: 'days-in-arrears',
    StartedDate: 'started-date', // Lachlan says this may be deprecated in future. Best not to rely on it for anything.
    PaidToDate: 'paid-to-date',

    PaymentBaseDate: 'payment-base-date',
    PaymentFrequency: 'payment-frequency',
    PaymentType: 'payment-type',
    PolicyName: 'policy-name',
    PremiumPerInterval: 'premium-per-interval'
  };

  var staticEntries = [
    { ProductCode: 'Life' }, // Future Development: change claims site to expect lowercase one like the server used to provide?
    { PolicyCode: 'Life' } // There is divergence here by what name the different sites expect these. Claims expects PolicyCode.
  ];

  var result = Mapping.toClientObject(
    clientPropToServerProp,
    {},
    { constantClientProps: staticEntries, throwOnUnknownServerKey: true },
    serverPolicyListEntry);

  var productInfoDef = V.first({ Code: result.ProductCode }, ProductInfo.Policies);
  if( !productInfoDef )
    throw new Error('Could not identify product: '+result.ProductCode+' '+result.PolicyName);

  return result;
}


function getCustomerPolicyListPromise() {
  var policyListUrl =  Constants.apiRoot + 'policy/list';

  var d = Q.defer();

  var xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var serverResponse = JSON.parse(xmlhttp.responseText);
      var policyListFromServer = serverResponse.results;
      var policyList = R.map(toClientPolicyListItem, policyListFromServer);
      if( policyList && policyList.length > 0 )
        d.resolve( policyList );
      else
        d.reject( xmlhttp.responseText );
    }
    if(xmlhttp.readyState == 4 && xmlhttp.status == 401) { // Forbidden
      d.reject( xmlhttp.responseText );
    }
    if(xmlhttp.readyState == 4 & xmlhttp.status == 0) { // could not connect
      d.reject( xmlhttp.responseText || 'unable to connect to login server: '+window.apiRoot);
    }
  }
  xmlhttp.open( "GET", policyListUrl , true );
  xmlhttp.send();


  return d.promise;
}

// Convert Server's policyDetails structure into client side structure.

var serverPolicyDetailsToClient = {
  "benefits": "Benefits",
  "benefits-error": "BenefitsError",
  "claims": "Claims",
  "claims-error": "ClaimsError",
  "current-cover": "CurrentCover",
  "documents": "Documents",
  "documents-error": "DocumentsError",
  "policy": "Policy"
  // NB: "home-address" dealt with below
};

// Benefits are sent from the server as a list of (say) 9 benefits and the amount of cover
// available under each benefit.
// For the ClaimDetails forms and UI, these are grouped into the current 5 different claim types.
// This function looks at the current-cover associated with each benefit type and finds the
// min and max values of current-cover associated with each ClaimType.
// Note that each BenefitType is associated with exactly one ClaimType, but each ClaimType might
// be associated with 1 or more BenefitTypes.
function groupBenefitInfoByClaimType(policyDetailsObj) {

  var OneFactorValue = policyDetailsObj.AmountOfCover / 12;
  // maps ClaimType -> { ClaimTypeCode: string, min: number, max: number }
  var claimTypesMap = R.reduce(function(memo, benefit) {
    return V.mashInto(benefit.BenefitClaimType, true, memo);
  }, {}, policyDetailsObj.Benefits);

  var claimTypesToMinMaxEligibility = R.mapObjIndexed(function(_, claimType) {
    var claimTypeDef = V.first({ Code: claimType }, ProductInfo.ClaimTypes);
    return {
      ClaimTypeCode: claimType,
      min: claimTypeDef.MinFactor * OneFactorValue,
      max: claimTypeDef.MaxFactor * OneFactorValue
    }
  }, claimTypesMap);

  // Array of: { ClaimTypeCode: string, min: number, max: number }
  return R.reduce(function(memo, claimType) {
    memo.push( claimTypesToMinMaxEligibility[claimType] );
    return memo;
  }, [], Object.keys(claimTypesToMinMaxEligibility));
}

function toPolicyDetails(policyDetailsFromServer) {

  var result = R.reduce(function (memo, serverKey) {
    return V.mashInto(serverPolicyDetailsToClient[serverKey], policyDetailsFromServer[serverKey], memo);
  }, {}, Object.keys(policyDetailsFromServer));

  // Change the policy object inside to match expected formatting
  var partialResult = R.mergeAll([
    R.omit(['Policy', 'Claims', 'Benefits'], result ),
    { Benefits: toBenefitsList(result.Benefits) },
    { Claims: ClaimsInteraction.toClaimsList(result.Claims) }, // convert items in the claims list, using the logic from server-claims-store.
    toClientPolicyListItem(result.Policy) // flatten the structure here, so we don't have .Policy under PolicyDetails object
  ]);

  return R.merge(partialResult, {
    BenefitInfoByClaimType: groupBenefitInfoByClaimType(partialResult)
  })
}
// given one policie's Uuid, get a promise for the policy details for it.
function getPolicyDetails(policyUuid) {
  var d = Q.defer();

  var policyDetailsUrl =  window.apiRoot + 'policy/details?' + UploadSupport.param({ "policy-uuid": policyUuid });

  var xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var policyDetailsFromServer = JSON.parse(xmlhttp.responseText);
      //console.log('policyDetails received.');
      if (policyDetailsFromServer && typeof(policyDetailsFromServer) === 'object') {
        var policyDetails = toPolicyDetails(policyDetailsFromServer);
        d.resolve(policyDetails);
      }
      else
        d.reject(xmlhttp.responseText);
    }
    if (xmlhttp.readyState == 4 && xmlhttp.status == 401) { // Forbidden
      d.reject(xmlhttp.responseText);
    }
    if (xmlhttp.readyState == 4 & xmlhttp.status == 0) { // could not connect
      d.reject(xmlhttp.responseText || 'unable to connect to login server: ' + window.apiRoot);
    }
  }
  xmlhttp.open( "GET", policyDetailsUrl , true );
  xmlhttp.send();


  return d.promise;
}

// given a list of 1 or more policies, return a promise for an array of the details of each of those policies
function getPolicyDetailsListPromise(policyList) {

  var promisesList = R.map(function(policyListItem) {
    return getPolicyDetails( policyListItem.PolicyUuid );
  }, policyList);


  return Q.all( promisesList );
}


var policyListStream = Bacon.fromPromise(getCustomerPolicyListPromise());
var policyDetailsStream = policyListStream.map(getPolicyDetailsListPromise);


module.exports = {
  getCustomerPolicyListPromise: getCustomerPolicyListPromise,
  getPolicyDetailsListPromise: getPolicyDetailsListPromise,
  policyListStream: policyListStream,
  toClientPolicyListItem: toClientPolicyListItem
}