var Bacon = require('baconjs');
var R = require('ramda');
var Q = require('q');
var V = require('../../../support/v');

var Connection = require('../../../support/connection');
var MappingSupport = require('../../../support/mapping');
var Constants = require('../../../constants/constants');

function getRequirementTypesProm() {
  var url = Constants.apiRoot + 'requirement/get-requirement-types';
  return Connection.toPostResponseProm(url, undefined, true);
}


// ReqEvents are part of the server's CustomerRequirementView, returned by api/requirement/get-requirements
// Convert the servers ReqEvent what is expect by the client side,
// which has camelCase properties instead.
var toReqEvent = MappingSupport.toClientObject(
  { // Mandatory
    "EventType":              "event-type",
    "Time":                   "time"
  },
  { // Optional
    "DocumentId":             "document-id",
    "UserUsername":           "user-username",
    "Valid":                  "valid?",
    "LastSubmittedAt":        "last-submitted-at",
    "Note":                   "note"
  },
  {
    valueTransformsByClientKey: {
      "Time": MappingSupport.Conversions.toMomentDate,
      "LastSubmittedAt": MappingSupport.Conversions.toMomentDate
    }
  } // no options
);


// Convert the servers requiremntto what is expect by the client side,
// which has camelCase properties instead.
// A function
var toRequirement = MappingSupport.toClientObject(
    { // Mandatory
      "RaisedAt":               "raised-at",
      "Type":                   "type",  // Key is from RequirementTypes list.
      "Status":                 "status",
      "RequirementUuid":        "requirement-uuid"
    },
    { // Optional
      "Events":                 "events",
      "LinkType":               "link-type",
      "LinkUuid":               "link-uuid",
      "Note":                   "note",
      "DocumentType":           "document-type",
      "RequirementSetUuid":     "requirement-set-uuid",
      "DueAt":                  "due-at"
    },
    {
      valueTransformsByClientKey: {
        "Event": R.lift(toReqEvent),
        "DueAt": MappingSupport.Conversions.toMomentDate,
        "RaisedAt": MappingSupport.Conversions.toMomentDate
        // "Type": reqTypeFromServer // Type values is not transformed. We use the same pattern as server for this.
      }
    }
  );



// Trigger on login
var requirementTypesProm = getRequirementTypesProm();

function getRequirementsProm() {
  var url = Constants.apiRoot + 'requirement/get-requirements';
  return Connection.toPostResponseProm(url, undefined, true);
}

function getRequirements() {
  var resultProm = Q.all([requirementTypesProm, getRequirementsProm()]).then(
    function(pair) {
      var requirementTypes = pair[0],
        requirementsServerData = pair[1]

      var requirementTypesMap = R.prop('results', requirementTypes );
      // TODO: If in future we need a more complex tranform here - it should handle the types of requirementTypes above.
      var requirements = R.compose(R.lift(toRequirement), R.prop('results'))( requirementsServerData );

      return requirements;
    })

  return Bacon.fromPromise(resultProm);
}

// TODO: remove, is just for debugging
// window.getRequirements = getRequirements;

module.exports = {
  getRequirements: getRequirements
}