var R = require('ramda');
var V = require('./v');
var Bacon = require('baconjs');

var FormsSupport = require('./forms');
var Constants = require('../constants/constants');


var DefaultValidator = require('../modules/validation/stores/basic-validation-store');

var DefaultValidationMessageProvider = {
  toNumberMessage: function( state ) {
    return state.valid === true ? { value: "", className: "" } : { value: "A valid number is required", className: "error" };
  },

  toEmptyMessage: function( state ) {
    return state.valid === true ? { value: "", className: "" } : { value: "A value is required", className: "error" };
  },

  toTrueMessage: function( state ) {
    return state.valid === true ? { value: "", className: "" } : { value: "This must be checked to proceed", className: "error" };
  },

  toDateMessage: function( state ) {
    return state.valid === true ? { value: "", className: "" } : { value: "Enter valid date: DD/MM/YYYY", className: "error" };
  },

  none: function(state) {
    return { value: "", className: "" }
  }
};


function getDefaultValidationInfoForDataType( validator, messageProvider, dataType) {
  var defaultMessageSuffix =  "Message";
  var result = {
    text:       { validationFunc: validator.isNotEmpty, messageFunc: messageProvider.toEmptyMessage, stateSuffix: defaultMessageSuffix },
    longtext:   { validationFunc: validator.isNotEmpty, messageFunc: messageProvider.toEmptyMessage, stateSuffix: defaultMessageSuffix },
    date:       { validationFunc: validator.isDate,     messageFunc: messageProvider.toDateMessage, stateSuffix: defaultMessageSuffix},
    checkbox:   { validationFunc: validator.alwaysPass, messageFunc: messageProvider.none, stateSuffix: defaultMessageSuffix },
    searchtext: { validationFunc: validator.alwaysPass, messageFunc: messageProvider.none, stateSuffix: defaultMessageSuffix }
  }[dataType];

  return result || { validationFunc: validator.alwaysPass, messageFunc: messageProvider.none, stateSuffix: defaultMessageSuffix };
}

// given a datatype, returns the default validation function for that question definition.
// TODO: FUTURE DEVELOPMENT: allow custom validation and custom validation messages from questionDef to be plugged in here..
function getValidationInfoForQuestionDef( validator, messageProvider, questionDef) {
  if( FormsSupport.isGroupFieldDef(questionDef))
    return undefined;
  var dataType = questionDef.Type;
  return getDefaultValidationInfoForDataType(validator, messageProvider, dataType);
}


//  datamodels is an object of the form dataModels.data, dataModels.actions etc
// e.g.
// {
//   data: {
//     streamName1:String -> stream1:Stream,
//     streamName2:String -> stream2:Stream
//   actions: {
//     streamName3:String -> stream3:Stream,
//     streamName4:String -> stream4:Stream
//  }
// }
// formDef is a FormDefinition object.
function ReeQ(dataModels, formDef) {

  console.log( "REEQ", dataModels )
  this.dataModels = dataModels;

  // This points to a version of dataModels that is what we will have after all the transforms have been applied to it.
  this.dataModelsAfterLastTransform = dataModels;
  this.dataModelValidationMessageSections = undefined; // calculated later
  this.transformedStreamNames = []; // keeps a list of the streams that have been transformed as targets.
  this.formDef = formDef;

  // add form rules from the form definition, and update the dataModelsAfterLastTransform prop
  // to a group of maps [streamName->stream] that represent the streams after rules have been applied to them.
  this.applyRuleTransforms();

  this.calculateValidatedStreams();
}

// TODO: is this being used?
ReeQ.prototype.getTransformedStreamNames = function() {
  return this.getTransformedStreamNames;
}
// TODO: is this being used?
ReeQ.prototype.getNonTransformedStreamNames = function() {
  return R.filter(function(streamName) {
    return R.contains(streamName, transformedStreamNames);
  }, Object.keys(this.dataModelsAfterLastTransform));
}

// Apply form rules from the form definition. After this, dataModelsAfterLastTransform will contain a map of the streams
// with any affected streams having undergone the transforms specified by the formDef's rules.
ReeQ.prototype.applyRuleTransforms = function() {
  var rules = this.formDef.Rules;

  var addTransform = this.addTransform.bind(this);
  R.forEach(function(rule) {
    addTransform(rule.Name, rule.NewProps, rule.Sources, rule.Targets);
  }, rules);
}

// Add a transform to the form fields streams, such as pulling some values out, generating a disabled property and distributing that to 1 or more target streams.
// Parameters;
//  transformName - string - the name of the rule or transform
//  propGeneroatorsMap - [ newPropName:string -> (paramsMap -> newPropNameValue ] ) - ie a map of functions that provide the new value when given a map of their source stream valeus
//  sourceStreamNames - array:string - names of the source streams
//  targetStreamNames - an array of the target stream names, which will have any propGenerators merged into them
ReeQ.prototype.addTransform = function(transformName, propGeneratorsMap, sourceStreamNames, targetStreamNames) {

  // TODO: this.dataModels has form dataModels.data, dataModels.actions at the moment.  This method has been adjusted
  // to handle that by looking in both .data and .actions and .whatever for the expected sourceStreams.
  // this means that it won't work properly if the same name is used in both dataModels.data and dataModels.actions to
  // refer to two separate streams.


  // eg: { data: map, actions: map }
  var currentDataModelsSections = this.dataModelsAfterLastTransform;


  // Note when say stream here, mean property really.
  // Flattens and reduces dataModels structure to map of streamName -> stream.
  // ie:
  // {
  //    data: {
  //      StreamName1: stream,
  //      StreamName2: stream,
  //      NotSourceStreamName: stream
  //    },
  //    someOtherSectionName: {
  //      StreamName3: stream
  //    }
  // }
  // Becomes this map:
  // {
  //    StreamName1: stream,
  //    StreamName2: stream,
  //    StreamName3, stream
  // }
  var sourceStreamsMap = R.reduce(function(memo, sectionName) {
    var currentSection = currentDataModelsSections[sectionName];

    var sourceStreamsForThisSection =  R.pick(sourceStreamNames, currentSection);
    return R.merge(memo, sourceStreamsForThisSection);
  }, {}, Object.keys(currentDataModelsSections));


  var allSourcesAsTemplateStream = Bacon.combineTemplate(sourceStreamsMap);

  // contains values of the style { disabled: true, visible: false } etc...
  var newPropertiesValStream = allSourcesAsTemplateStream.map(function (sourceStreamVals) {
    return R.mapObjIndexed(function(propGeneratorFunc, propName) {
      return propGeneratorFunc(sourceStreamVals);
    }, propGeneratorsMap);
  });

  var newDataModelsSections = R.mapObjIndexed(function( dataModelSection, sectionName) {
    var currentDataModels = dataModelSection;
    var newDataModels = R.mapObjIndexed(function (stream, streamName) {
      if (R.contains(streamName, targetStreamNames)) {
        // ie is a targetStream, so it needs the new properties distributed to it.

        var inputStream = Bacon.combineTemplate({
          targetStreamVal: stream,
          newPropValsMap: newPropertiesValStream
        });

        return inputStream.map(function (input) {
          return R.merge(input.targetStreamVal, input.newPropValsMap);
        });
      }
      else
      // ie. not a target stream, so no change
        return stream;

    }, currentDataModels);

    return newDataModels;
  }, currentDataModelsSections);

  this.dataModelsAfterLastTransform = newDataModelsSections;
  this.transformedStreamNames.push.call(this, targetStreamNames);
  return this.dataModelsAfterLastTransform;
}

ReeQ.prototype.calculateValidatedStreams = function() {
  var dataModelsSections = this.dataModelsAfterLastTransform;
  var formDef = this.formDef;

  // A get map of all fields in the def, including groups
  var fieldDefsByName = R.reduce(
    function(memo, fieldDef) {
      return V.mashInto( fieldDef.Code, fieldDef, memo);
    },
    {},
    FormsSupport.getQuestionFieldsFromFormDef( formDef, true )
  );

  var validator = DefaultValidator;
  var validationMessageProvider = DefaultValidationMessageProvider;
  var validationInfoByFieldName = R.mapObjIndexed(function( fieldDef, fieldName) {
    if( FormsSupport.isGroupFieldDef(fieldDef))
      return undefined;

    return getValidationInfoForQuestionDef(validator, validationMessageProvider, fieldDef);
  }, fieldDefsByName);

  // 1. dataModelsAfterLastTransform to be updated to include their relevant 'valid' field.


  var dataModelsSectionsWithValidFlag = R.mapObjIndexed(function( dataModelSection, sectionName) {
    var currentDataModels = dataModelSection;

    var dataModelsWithValidField = R.mapObjIndexed(function (stream, streamName) {

      var fieldDef = fieldDefsByName[streamName];
      if (FormsSupport.isValueField(fieldDef)) {

        var validationInfo = validationInfoByFieldName[fieldDef.Code];;
        var validationFunc = validationInfo.validationFunc;
        // ie is a targetStream, so it needs the new properties distributed to it.
        return stream.map(validationFunc);
      }
      else if( FormsSupport.isGroupFieldDef(fieldDef)) {
        return stream; // no change
      }
      else {
        // ie. not a target stream, so no change
        console.error("Could not identify field definition for field: "+streamName);
        return undefined;
      }

    }, currentDataModels);

    return V.removeUndefinedValsFromMap( dataModelsWithValidField );
  }, dataModelsSections);

  this.dataModelsAfterLastTransform = dataModelsSectionsWithValidFlag;


  // 2. need to create and return streams for the validationMessageState for each field...


  var dataModelSectionsForValidationMessages = R.mapObjIndexed(function( dataModelSection, sectionName) {
    var currentDataModels = dataModelSection;


    var streamNameToIngredients = R.mapObjIndexed(function(stream, streamName) {
        var fieldDef = fieldDefsByName[streamName];
        if (FormsSupport.isValueField( fieldDef )) {
          var validationInfo = validationInfoByFieldName[fieldDef.Code];

          return {
            fieldDef: fieldDef,
            stream: stream,
            validationInfo: validationInfo,
            validationMessageStreamName: fieldDef.Code + validationInfo.stateSuffix
          }
        }
        else if( FormsSupport.isGroupFieldDef(fieldDef)) {
          // Groups don't have validation fields associated with them, as far as planned.
          return undefined;
        }
        else {
          console.error("Could not identify field definition for field: "+streamName);
          return undefined;
        }
      },
      currentDataModels);

    var validationStreamNameToIngredients = R.fromPairs(
      R.map(function(pair) {
        return [ pair[1].validationMessageStreamName, pair[1]];
      }, R.toPairs(V.removeUndefinedValsFromMap( streamNameToIngredients)))
    );


    var validationStreamInfosForThisDataModel = R.mapObjIndexed(function (ingredients, validationMessageStreamName) {

      var fieldDef = ingredients.fieldDef;
      var validationInfo = ingredients.validationInfo;
      var messageFunc = ingredients.validationInfo.messageFunc;

      // ie is a targetStream, so it needs the new properties distributed to it.
      //return ingredients.stream.map(messageFunc);
      return ingredients.stream.map(messageFunc).changes().toProperty({ value: "", open: false, className: "" }).skipDuplicates(R.eqDeep);

    }, validationStreamNameToIngredients);


    return validationStreamInfosForThisDataModel;
  }, dataModelsSectionsWithValidFlag);

  this.dataModelValidationMessageSections = dataModelSectionsForValidationMessages;

  // TODO: remvoe this, it's just for debugging:
  R.mapObjIndexed(function(section, sectionMame){
    R.mapObjIndexed(function(validationMessageStream, validationStreamName){
      validationMessageStream.log('###['+validationStreamName+']: ');
    },  section);
  }, dataModelSectionsForValidationMessages);

  return dataModelSectionsForValidationMessages;
}
module.exports = {
  fromActionDef: function(actionDef, formDef) { return new ReeQ(actionDef, formDef); }
}