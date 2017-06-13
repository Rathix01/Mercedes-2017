var Bacon = require('baconjs');
var R = require('ramda');
var V = require('./v');

var moment = require('moment');

// Responsible for converting a server object to a client object.
// By default, warns on missing mandatory keys, or on unknown keys, but does not throw exceptions.
//
// TODO: currently there are use cases where the serverObj has fields that are expected to be flattened into client fields.
// This is not handled by 'toClientObject' yet, but should be a list of flattenable properties in the options.
//
// Params:
// - clientKeysToServerMandatory - a map of client keys
var toClientObject = R.curry(function(clientKeysToServerMandatory, clientKeysToServerOptional, _options, serverObj) {

  var options = R.merge(
    {
      valueTransformsByClientKey: {}, // maps ClientKey --> function(serverVal, serverObj) that will return values for it.
      constantClientProps: {}, // maps ClienKey -> some constant
      expandedClientProps: {}, // creates new client props. Wider case of constantClientProps, which should be deprecated.
      throwOnUnknownServerKey: false,
      warnOnUnknownServerKey: true,
      throwOnMissingMandatoryKey: false,
      warnOnMissingMandatoryKey: true
  }, _options);

  function onUnknownServerKey(serverKey) {
    if( options.throwOnUnknownServerKey)
      throw 'Unknown server key: '+serverKey;
    else if( options.warnOnUnknownServerKey)
      console.warn('Unknown server key: '+serverKey);
  }
  function onMissingClientKeyVal(clientKey) {
    if( options.throwOnMissingMandatoryKey)
      throw 'Missing mandatory key: '+clientKey;
    else if( options.warnOnMissingMandatoryKey)
      console.warn('Missing mandatory key: '+clientKey);
  }

  // A map of server key -> client
  var serverKeysToClientMandatory = R.invertObj(clientKeysToServerMandatory);
  var serverKeysToClientOptional = R.invertObj(clientKeysToServerOptional);

  var newPropsList = R.map(function(key){

    var clientKeyFromMandList = serverKeysToClientMandatory[key];
    var clientKeyFromOptionalList = serverKeysToClientOptional[key];
    if( !clientKeyFromMandList && !clientKeyFromOptionalList ) {
      onUnknownServerKey(key);
      return undefined;
    }
    else {
      var clientPropName = clientKeyFromMandList || clientKeyFromOptionalList;
      var intermediateVal = serverObj[key];
      var val = options.valueTransformsByClientKey[clientPropName]?
        options.valueTransformsByClientKey[clientPropName](intermediateVal) : // needs to be Arity 1 so can have lift applied to is
        intermediateVal;

      return R.createMapEntry(clientPropName, val)
    }
  }, Object.keys(serverObj));
  var result = R.mergeAll( newPropsList.concat(options.constantClientProps) );

  var calculatedProps = R.mapObjIndexed(function(propCreator, propName) {
    return propCreator(result);
  }, options.expandedClientProps);


  // examine result and ensure that all expected client keys are present.
  R.forEach(function(clientKey) {
    if( !result[clientKey] )
      onMissingClientKeyVal(clientKey);
  }, Object.keys(clientKeysToServerMandatory));

  var fullResult = R.merge(result, calculatedProps);
  return fullResult;
});


var Conversions = {
  toMomentDate: function(str) {
    return moment(str);
  }
};

var Expansions = {
  toDateText: function(propName) {
    return function(clientObj) {
      return (clientObj[propName] && (typeof(clientObj[propName].format) === 'function')) ? clientObj[propName].format('DD/MM/YYYY') : clientObj[propName] }
  },
  toDateTimeText: function(propName) {
    return function(clientObj) { return (clientObj[propName] && (typeof(clientObj[propName].format) === 'function'))? clientObj[propName].format('DD/MM/YYYY HH:MM:SS') : clientObj[propName] }
  }
}


module.exports = {
  toClientObject: toClientObject,
  Conversions: Conversions,
  Expansions: Expansions
}