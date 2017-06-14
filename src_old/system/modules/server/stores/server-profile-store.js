var Bacon = require('baconjs');
var R = require('ramda');
var Q = require('q');

var V = require('../../utilities/v');
var Connection = require('../../utilities/connection');
var Constants = require('../../utilities/constants')

var MockServerData = require('./mock-server-data');


var serverProfilePropsToClientDetailsMap = {
  "last-name": "LastName",
  "gender-other": "__", // combined with 'gender' to form single ClientDetails field Gender
  "occupation": "Occupation",
  "username": "Username",
  "first-names": "FirstName",
  "date-of-birth": "DateOfBirth",
  "mobile-number": "MobileNumber",
  "gender": "Gender",
  "annual-income": "AnnualIncome",
  "account-reference": "AccountReference",
  "customer-uuid": "CustomerID",
  // NB: "home-address" dealt with below
};

var serverProfileHomeAddressToClientDetailsMap = {
  "country": "Country",
  "city": "City",
  "suburb": "Suburb",
  "line2": "Address2",
  "line1": "Address1",
  "state": "State",
  "post-code": "PostCode"
};

var mockedUserProfileFields = [ 'Email', 'PreferredContactMode' ];

var getProfileFieldsFromMaps = R.compose(Object.keys, R.omit('__'), R.invertObj, R.merge);
var UserProfileFieldNames = getProfileFieldsFromMaps(serverProfilePropsToClientDetailsMap, serverProfileHomeAddressToClientDetailsMap)
  .concat(mockedUserProfileFields);


function getClientDetailsFromServerResult(serverResult) {

  var clientDetailsObj = R.reduce(function(acc, key) {
    var targetValue = serverResult[key];

    var newProps = undefined;
    if( key === 'gender-other') {
      // skip for the moment, handled below
    }
    else if( key !== "home-address") {
      var targetPropName = serverProfilePropsToClientDetailsMap[key];

      if( targetPropName === undefined)
        throw 'unknown property: "'+key+'" in server profile result';

      //if( key === 'date-of-birth')  TODO: this needs to be in format YYYY-MM-DD for submission to server, but DD/MM/YYYY for display.
      //  targetValue = moment(targetValue).format('DD/MM/YYYY');
      newProps = R.objOf(targetPropName, targetValue);
    } else {
      // ie: handle home address
      var newPropsToServerProps = R.invertObj(serverProfileHomeAddressToClientDetailsMap);

      newProps = R.mapObjIndexed(function(serverPropName, clientPropName) {
        return targetValue[serverPropName];
      }, newPropsToServerProps);

      // make sure the server didn't return a property that we haven't explicitly handled.
      var hasAllServerProps = R.all(function(serverPropName) {
        return !!serverProfileHomeAddressToClientDetailsMap[serverPropName]
      }, Object.keys(targetValue)); // targetValue is server 'address' object

      if( !hasAllServerProps)
        throw 'unknown address format: "'+JSON.stringify(targetValue)+'" in server profile result';

      // TODO: remove this-  just used for testing validation of Address (eg on confirmInfo page).
      // If uncommented, means the address will initially be populated without the required first line, triggering validation failure.
      // newProps.Address1 = '';
    }

    return R.merge(acc, newProps);
  }, {}, Object.keys(serverResult));

  var resultGender = (serverResult.gender === 'male' || serverResult.gender === 'female')
    ? serverResult.gender
    : serverResult['gender-other'];

  var result = R.merge( clientDetailsObj, R.objOf('Gender', resultGender))

  return MockServerData.updateProfleWithMockAdditions( result );
}

function getUserProfilePromise() {

  var d = Q.defer();

  var profileUrl =  (window.apiRoot || "http://test.volo.nz/api/") + 'customer/profile';

  var xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var serverResult = JSON.parse(xmlhttp.responseText);

      var clientDetails = getClientDetailsFromServerResult(serverResult);
      d.resolve( clientDetails);
    }
    if(xmlhttp.readyState == 4 && xmlhttp.status == 401) { // Forbidden
      d.reject( xmlhttp.responseText );
    }
    if(xmlhttp.readyState == 4 & xmlhttp.status == 0) { // could not connect
      d.reject( xmlhttp.responseText || 'unable to connect to login server: '+window.apiRoot);
    }
  }
  xmlhttp.open( "GET", profileUrl , true ); // plz keep url absolute.
  xmlhttp.send();


  return d.promise;
}


function getClientIdentity() {
  var url = Constants.apiRoot + 'customer/identity';

  return Connection.toGetResponseProm(url, undefined, true);
}


// A map of: modelname -> the property name expected by the server
var ConfirmInfoModelToUpdateProfileProps = {
  FirstName: 		        "first-names",
  LastName: 	 		      "last-name",
  Occupation:           "occupation",
  MobileNumber: 	 	    "mobile-number",
  Gender:      	 	      "gender",
  DateOfBirth: 	 	      "date-of-birth",

  AnnualIncome:         "annual-income",  // There is no associated control for this at the time of writing.

// These will need to become properties of an address object
  Address1:             "line1",
  Address2:             "line2",
  Suburb:               "suburb",
  City:                 "city",
  PostCode:             "post-code",  // Country and state are supported by the api, but not confirm-info screen; uneditable.
  State:                "state",
  Country:              "country"

// These below are sent separately as part of the claim..

//  AccountNumber:        "",
//  AccountHolder:        "",
//  StoreAccountDetails:  "",

// These below are not yet sent to the server yet as API doesn't support them.
//  Email:                "",
//  PreferredContactMode: "",

//
// Username is a valid model, but not sent to server as username is not updatable.
// Username: ""

}


// this converts confirmInfoValue object (which holds the fields from the buses and changes from the UI)
// to serverUpdateProfile format - suitable for submitting to servers customer/update-profile api.
// Mainly this just slightly reformats the fieldnames and creates the not-quite-flat structure expected by the server.
function clientConfirmInfoStreamToServerUpdateProfileObj(confirmInfoState) {
  var addressMap = R.pick(['Address1', 'Address2', 'Suburb', 'City', 'PostCode', 'State', 'Country'], ConfirmInfoModelToUpdateProfileProps);
  var nonAddressFieldNames = R.reject(function(propName) { return R.has(propName, addressMap); }, Object.keys(confirmInfoState));
  var nonAddressFieldMap = R.pick(nonAddressFieldNames, ConfirmInfoModelToUpdateProfileProps);

  function getControlVal(clientPropName, serverKeyName){ return confirmInfoState[clientPropName] }
  var getServerObjFromMap = R.compose(R.mapObjIndexed(getControlVal), R.invertObj);

  // address obj might have state and country fields, or line2 fields that are undefined.
  // When sent to the server these cause an error unless the fields with undefined values are stripped first.
  var addressObj = V.stripUndefinedFields(getServerObjFromMap(addressMap));
  var confirmInfoFields = getServerObjFromMap(nonAddressFieldMap);

  // In server API, gender-other field should be not present, unless confirmInfoFields gender is not 'male' or 'female'
  var optGenderOtherField = ( confirmInfoFields.Gender === 'male' || confirmInfoFields.Gender === 'female' ) ? {} : R.objOf('gender-other', confirmInfoState.Gender);
  return R.mergeAll(
    [
      confirmInfoFields,
      {
        "home-address": addressObj,
        "gender": ( confirmInfoFields.Gender === 'male' || confirmInfoFields.Gender === 'female' ) ? confirmInfoFields.Gender : 'other'
      },
      optGenderOtherField
    ]);
}

// Returns a promise, for the given claims draft submission receiving a claims-uuid.
function submitProfileUpdatesToServer(confirmInfoValueObj) {

  var d = Q.defer();

  var serverSubmissionData = clientConfirmInfoStreamToServerUpdateProfileObj(confirmInfoValueObj);

  function toUpdateProfileResponseObj(serverResponse) {
    // formate a server response into expected form in the client eg ClaimUuid instead of 'claim-uuid'.
    return serverResponse;
  }

  var updateProfileUrl = window.apiRoot + 'customer/update-profile';

  var xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      var serverResponse = JSON.parse(xmlhttp.responseText);
      //console.log('update profile response received.');
      if (serverResponse && typeof(serverResponse) === 'object') {
        var updateProfileResponse = toUpdateProfileResponseObj(serverResponse);
        if( updateProfileResponse.success )  // TODO: perform this check for the other API calls above
          d.resolve(updateProfileResponse);
        else
          d.reject(updateProfileResponse);
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

  //console.log('submitting customer profile update...');

  xmlhttp.open( "POST", updateProfileUrl, true );
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(serverSubmissionData));

  return d.promise;
}

// not a promise
function getClientIdentityStream() {
    return Bacon.fromPromise(getClientIdentity());
}

function getUserProfileStream() {
  return Bacon.fromPromise( getUserProfilePromise() )
}

module.exports = {
  getClientIdentity: getClientIdentity,
  getClientIdentityStream: getClientIdentityStream,

  getUserProfileStream: getUserProfileStream,
  getUserProfilePromise: getUserProfilePromise,
  submitProfileUpdatesToServer: submitProfileUpdatesToServer,


  getClientDetailsFromServerResult: getClientDetailsFromServerResult,

  UserProfileFieldNames: UserProfileFieldNames,
  ConfirmInfoModelToUpdateProfileProps: ConfirmInfoModelToUpdateProfileProps
}