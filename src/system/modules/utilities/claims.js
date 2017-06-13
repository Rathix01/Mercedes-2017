/**
 * Created by Medibot on 4/05/2015.
 */
var R = require('ramda');
var Moment = require('moment');
var Formatting = require('./formatting');
var V = require('./v');
var ProductInfo = require('../modules/product/stores/product-info');

// given a claims eligibility range object with .min and .max, give a friendly english description of it.
function toRangeDescriptionObj(range) {
  // NOTE: if range is undefined here it can be because ClaimType,AvailableClaimTypeCodes are out of sync with ClaimType.value

  var minValueAsString = Formatting.toCurrencyWithCents(range.min);
  var maxValueAsString = Formatting.toCurrencyWithCents(range.max);
  if( minValueAsString === maxValueAsString )
    return { value: minValueAsString };
  else {
    return { value: 'From ' + minValueAsString + ' to ' + maxValueAsString };
  }
}

function addDefaultsToRequirement( requirementDef ) {
  return requirementDef === undefined
    ? undefined
    : R.merge({
      TaskInstructions: requirementDef.Description
      }, requirementDef);
}
// Given a list of docCodes, get User Friendly document desriptions for these in an array
function getRequirementDefinition( docCode ) {
  return addDefaultsToRequirement ( V.first({ Code: docCode }, ProductInfo.RequirementInfo) );
}
function getDocDescription( docCode ) {
  return getRequirementDefinition(docCode).Description;
}
function getUserFriendlyDocDescriptions( docCodes ) {
 return R.map(getDocDescription, docCodes);
}
function getTaskInstructions( docCode ) {
  return getRequirementDefinition(docCode).TaskInstructions;
}

function claimTypeCodeToValueText( claimTypeCode ) {
  function getClaimTypeDef( claimTypeCode ) {
    return V.getFirst(ProductInfo.ClaimTypes, { Code: claimTypeCode });
  }
  function getValueAndText( claimTypeDef) {
    return { value: claimTypeDef.Code, text: claimTypeDef.Description };
  }
  return getValueAndText( getClaimTypeDef( claimTypeCode ));
}
function toClaimTypeAndOptionsSet( claimTypeCode, availableClaimTypeCodes ) {
  return {
    actionKey: 'Claims_Intro_ClaimType',
    value: claimTypeCode,
    text: claimTypeCodeToValueText( claimTypeCode).text,
    options: availableClaimTypeCodes.map(claimTypeCodeToValueText)
  };
}

// get the Eligibility Range for a given policy-claim tuple - returns an object with { min: Number,  max: Number}
function getEligibilityRangeObj( policyClaimSet ) {
  var currentPolicyItem = V.first( { PolicyNumber: policyClaimSet.PolicyNumber }, policyClaimSet.PolicyDetailsList );
  var currentClaimInfoItem = V.first( { ClaimTypeCode: policyClaimSet.ClaimType }, currentPolicyItem.BenefitInfoByClaimType);
  return currentClaimInfoItem;
}

// store flow to get the policyName by this point.
function getDocCodeRequirements( policyClaimSet ) {
  return V.getFirst(ProductInfo.ClaimTypes, { Code: policyClaimSet.ClaimType }).RequirementCodes;
}

function getClaimTypeDef( claimTypeCode ) {
  return V.first({ Code: claimTypeCode }, ProductInfo.ClaimTypes );
}
function claimTypeDefToClaimDetailsInstructions( claimTypeDef) {
  return {
    value: claimTypeDef.Description,
    notifiables: claimTypeDef.RequirementNotifiables,
    detailsInstructions: claimTypeDef.DetailsInstructions
  };
}
function getStatusDefinition( statusCode ) {
  return V.first(
    function( sdef ) { return sdef.Code.toLowerCase() === statusCode.toLowerCase() }, // { Code: statusCode },  /// this just makes the lookup case insensitive.
    ProductInfo.StatusCodes );
}
function getStatusDesc( statusCode ) {
  return getStatusDefinition(statusCode).Description;
}

function getUsersMostRecentClaimId() {
  function getComparisonItem(claimsDef) {
    return Moment(claimsDef.CreatedDate);
  }

  var mostRecentClaimsDefinition = R.maxBy(getComparisonItem, CustomerInfo.ClaimsHistory);
  return mostRecentClaimsDefinition !== undefined
    ? mostRecentClaimsDefinition.Id
    : undefined;
}


var formsExcludedProps = ['actionKey','menuSearching','menuOpen','options','userTyped','disabled']; // TODO: not ideal. Decorative properties should not be sent to server either, rather than sanitized on return.


module.exports = {
  toRangeDescriptionObj: toRangeDescriptionObj,
  getUserFriendlyDocDescriptions: getUserFriendlyDocDescriptions,
  getTaskInstructions: getTaskInstructions,
  getRequirementDefinition: getRequirementDefinition,
  claimTypeCodeToValueText: claimTypeCodeToValueText,
  toClaimTypeAndOptionsSet: toClaimTypeAndOptionsSet,
  getEligibilityRangeObj: getEligibilityRangeObj,
  getDocCodeRequirements: getDocCodeRequirements,
  getClaimTypeDef: getClaimTypeDef,
  claimTypeDefToClaimDetailsInstructions: claimTypeDefToClaimDetailsInstructions,
  getStatusDefinition: getStatusDefinition,
  getStatusDesc: getStatusDesc,
  getUsersMostRecentClaimId: getUsersMostRecentClaimId,
}