var R = require('ramda');
var Bacon = require('baconjs');
var Q = require('q');

var V = require('../support/v');
var Constants = require('../constants/constants');

var StateStore =  require('../stores/state-store');
var ProductInfo = require('../modules/product/stores/product-info');
var DoctorSearchSupport = require('../modules/server/stores/doctor-search-interaction-store');

var ActionManager = require( '../actions/action-manager' );


function isValueField( fieldDef ) {
  return fieldDef && fieldDef.Fields === undefined;
}
function isGroupFieldDef( fieldDef ) {
  return fieldDef && fieldDef.Fields !== undefined;
}

// Given a field definition, return the fully qualified id of the field
function getQualifiedName( formDef, fieldDef ) {
  return formDef.Namespace + fieldDef.Code;
}

// given a form, or a group, gets the question fields form it recursively and returns a flat array of them.
function getQuestionFieldsFromFormDef( fieldContainer, includeGroups ) {
  function getSubFieldsIfPresent( fieldOrGroup ) {
    return fieldOrGroup.Fields
      ? includeGroups ?  [fieldOrGroup].concat(fieldOrGroup.Fields) : fieldOrGroup.Fields
      : fieldOrGroup;
  }
  var allFieldsNonFlat = R.reduce( function( memo, entry ) {
    memo.push( getSubFieldsIfPresent( entry ));
    return memo;
  }, [], fieldContainer.Fields);

  return R.flatten(allFieldsNonFlat);
}

// Returns the FieldDefinitions for the ancestors of the field with given FieldDefCode.
function getFieldDefAncestors( formDef, fieldDefCode ) {
  return getAncestorGroupsForField( formDef, fieldDefCode, []);
}

function getAncestorGroupsForField( formDefOrFieldContainer, fieldDefCode, currentChainIncludingContainer ) {
  // recursive search for ancestors of fieldDef.
  var childFields = formDefOrFieldContainer.Fields || [];
  var targetField = V.first({ Code: fieldDefCode }, childFields);

  if( targetField )
    return R.reverse(currentChainIncludingContainer);

  var resultFromChildField = R.map(function(currentFieldDef) {
    var chainIncludingCurrentChild = currentChainIncludingContainer.concat( [ currentFieldDef ]);
    return getAncestorGroupsForField(currentFieldDef, fieldDefCode, chainIncludingCurrentChild);
  }, childFields)
    .filter( function(results) { return results !== undefined; })
    [0];

  // this is undefined if failed to find this child
  return resultFromChildField;
}


// Given a form Definition, determines the list of ancestor FieldDefs for each FieldDef in the Form.
// Returns a map of:   FieldDefCode -> [ FieldDefParent, FieldDefGrandparent, ... ]
function getFieldCodeToAncestorListMap( formDef ) {
  return getFieldCodeToAncestorListMapRecursive( formDef, [])
}
function getFieldCodeToAncestorListMapRecursive( formDefOrFieldContainer, currentAncestorList ) {
  var fieldDefsForThisLevel = formDefOrFieldContainer.Fields || [];

  // if formDefOrFieldContainer is a formDef, there is no entry corresponding to it, so it is an empty map.
  var isFormDef = ( formDefOrFieldContainer.FieldType !== Constants.Forms.FieldTypes.group &&
                    formDefOrFieldContainer.FieldType !== Constants.Forms.FieldTypes.question &&
                    formDefOrFieldContainer.FormDefVersion );
;
  var mapWithThisEntry = isFormDef ? {} : R.createMapEntry( formDefOrFieldContainer.Code, currentAncestorList );
  var ancestorsListForChildren = isFormDef ? currentAncestorList : [ formDefOrFieldContainer ].concat(currentAncestorList);

  var descendentsMaps = R.map(
    function(childFieldDef) {
      return getFieldCodeToAncestorListMapRecursive( childFieldDef, ancestorsListForChildren);
    },
    fieldDefsForThisLevel);

  return R.mergeAll( [ mapWithThisEntry ].concat( descendentsMaps ));
}


function getSearchSupportObj( supportObjName ) {
  if( supportObjName === 'DoctorSearchSupport') {
   return DoctorSearchSupport;
  } else {
    throw "Cannot find support object: "+supportObjName;
  }
}

function createBusForQuestionField( fieldDef, formNamespace ) {
  var fullyQualifiedFieldName = formNamespace + fieldDef.Code;

  if( fieldDef.Type === Constants.Forms.DataTypes.searchtext ) {
    if( !fieldDef.DefData )
      throw 'expected DefData for fieldDef of type "searchtext" '+formNamespace+fieldDef.Code;

    var supportObj = getSearchSupportObj(fieldDef.DefData.SearchSupport);
    var searchFunction = supportObj[ fieldDef.DefData.SearchType ];
    var getDisplayTextForOptionFunc = supportObj[ fieldDef.DefData.DisplayTextForOption ]

    var modelBus = new Bacon.Bus();

    ActionManager.register(R.createMapEntry(fullyQualifiedFieldName, modelBus));  // TODO: Not the ideal place for it, but this bus is never registered otherwise.

    var searchBoxValueStream = setUpSearchBox(modelBus, fullyQualifiedFieldName,
      searchFunction,
      {
        getDisplayTextForOption: getDisplayTextForOptionFunc
      }
    );
    searchBoxValueStream.log('searchBoxValueStream-: ');
    var searchBoxComponentStream = searchBoxValueStream.map(function(sbVal) {
        return {
          actionKey: fullyQualifiedFieldName,
          value: sbVal
        }
      })
      .scan(getInitialValueObj(fullyQualifiedFieldName, fieldDef), R.merge);  // i.e. TO property with initial value

    searchBoxComponentStream.log('searchBoxComponentStream-: ');
    return {
      bus: modelBus,
      stream: searchBoxComponentStream
    };
  }
  else {
    var bus = new Bacon.Bus();
    var fieldStream = bus.scan(
      getInitialValueObj(fullyQualifiedFieldName, fieldDef),
      function(existing, next) {
        return R.merge(existing, next);
      });

    return {
      bus: bus,
      stream: fieldStream
    }
  }
}

function createBusForGroupField(fieldDef, formNamespace) {
  var bus = new Bacon.Bus();
  return {
    bus: bus,
    stream: bus.scan(R.createMapEntry('value', ''), function(existing, next) { return R.merge( existing, next ) })
  }
}

function createBusForFieldDef( fieldDef, formNamespace) {
  if( fieldDef.FieldType === Constants.Forms.FieldTypes.group )
    return createBusForGroupField( fieldDef, formNamespace );
  else if( fieldDef.FieldType === Constants.Forms.FieldTypes.question )
    return createBusForQuestionField( fieldDef, formNamespace );
  else
    throw new Error("Could not create bus for fieldDef "+ fieldDef.Code + " with type: " + fieldDef.FieldType );
}

// Given a formDefinition and a namespace to put it under, this
// returns a map of models, by their fully-qualified id, each pointing to a new bus
// This is needed because we don't want to manually write the boilerplaet action defintion every time we need a new form.
// Or everytime we want to put an existing form under a new namespace (eg for viewing existing claim, or admin view form).
function createBusesFromFormDef( namespacePropName, formDef ) {

  var allQuestionFieldDefs =  getQuestionFieldsFromFormDef(formDef, true);
  var formNamespace = formDef[namespacePropName];

  // localMap : Name|Code] --> { bus: Bus, stream: Stream }
  var localNameToBusStreamPair = R.reduce(function( obj, fieldDef ) {
    return V.mashInto( fieldDef.Code, createBusForFieldDef(fieldDef, formNamespace), obj);
  }, {}, allQuestionFieldDefs);

  var localNamesToBuses = R.mapObj(R.prop('bus'), localNameToBusStreamPair);
  var localNamesToStreams = R.mapObj(R.prop('stream'), localNameToBusStreamPair);

  // Provide a namespaced stream result as well.
  // qualifiedMap : AreaName_FormDefName_Name|AreaName_FormDefName_Code --> { bus: Bus, stream: Stream }
  function qualify(localName ) { return formNamespace + localName; }
  function createQualifiedMap( mapByLocalName ) {
    return R.reduce(
      function( acc, localName) {
        acc[ qualify(localName) ] = mapByLocalName[ localName];
        return acc;

      }, {}, R.keys(mapByLocalName)
    );
  }

  var qualifiedNamesToBuses = createQualifiedMap(localNamesToBuses);
  var qualifiedNamesToStreams = createQualifiedMap(localNamesToStreams);

  return {
    streams: localNamesToStreams,
    namespacedStreams: qualifiedNamesToStreams,
    buses: localNamesToBuses,
    namespacedBuses: qualifiedNamesToBuses
  }
}
var createDetailsBusesFromFormDef = createBusesFromFormDef.bind(this, 'Namespace');
var createHistoryBusesFromFormDef = createBusesFromFormDef.bind(this, 'ViewNamespace');


// Future development: Allow initial value to be set by: Field Def, Or by a Rule.
function getInitialValueForType( type ) {
  switch( type )
  {
    default:
      console.warn('unknown type: '+type);
      return '';
    case 'text':
      return '';
    case 'longtext':
      return '';
    case 'date':
      return '';
    case 'checkbox':
      return false;
    case 'searchtext':
      return undefined;
  }
}
function getInitialValue( fieldDef ) {
  return R.keys(fieldDef).indexOf('Initial') > -1
    ? fieldDef.Initial
    : getInitialValueForType( fieldDef.Type );
}
function getInitialValueObj( fullyQualifiedFieldName, fieldDef ) {
  return {
    actionKey: fullyQualifiedFieldName,
    value: getInitialValue(fieldDef)
  }
}

// ------------ setUpSearchBox section ------------ //

// NOTE: RightAddress needs at least 4 characters or it will reject the search and
// return an empty array
var MIN_QUERY_LENGTH = 4;
var QUERY_DEBOUNCE_INTERVAL = 0;

function toSearching(arg) {
  return !!arg;
}

function hasSuggestions(suggestions) {
  return suggestions !== undefined && suggestions !== null && suggestions.length > 0;
}

function setUpSearchBox( searchBoxActionStream, publishName, searchCallback, options) {

  var _options = R.merge({
    getDisplayTextForOption: function ( x ) { return ''+x; },  // used so that options could be an array of strings or an array of objects
    publish: true // TODO: currently ignored.
  }, options);

  var userTypedActionStream = searchBoxActionStream
    .map(R.prop('userTyped')).skipDuplicates();
  var userTypedActionStreamCleaned = userTypedActionStream
    .debounceImmediate(QUERY_DEBOUNCE_INTERVAL)
    .skipDuplicates();

  function getDisplayTextKeyVal(option ) {
    return { displayText: _options.getDisplayTextForOption(option) };
  }

  // maps a list of options onto an updated list of options that have the displayText prop
  var addDisplayText = V.expand(getDisplayTextKeyVal);
  var suggestions = userTypedActionStreamCleaned.flatMapLatest(performSearch).map(R.map(addDisplayText)).skipDuplicates(V.equals); // skipping duplicate suggestions
  //suggestions.log('new-suggestions');
  var optionText = suggestions.map(R.map(R.prop('displayText'))).skipDuplicates(V.equals);
  //optionText.log('new-option-text');
  // plagarized from https://baconjs.github.io/index.html movie search
  function performSearch( queryText ) {
    if (!queryText || queryText.length < MIN_QUERY_LENGTH) {  // NOTE: RightAddress needs at least 4 characters or it will reject the search and return an empty array
      return Bacon.once([]);
    }
    return Bacon.fromPromise(searchCallback(queryText));
  }

  var itemCurrentlyClicked= searchBoxActionStream.map(R.prop('itemSelected')).skipDuplicates();
  var userTyping = userTypedActionStream.skipDuplicates().map(function(ut) { return ut !== undefined && ut.length > 0;  }).toProperty(false);
  var selectionActions = Bacon.combineTemplate({
    itemCurrentlyClicked: itemCurrentlyClicked,
    userTyping: userTyping
  })
  var itemSelected =
    selectionActions.scan( false, function(acc,next){
      if ( !acc &&  next.itemCurrentlyClicked ) return true;
      if( acc && next.userTyping ) return false;
      return acc;
    });
  var suggestionsPresent = suggestions.map(hasSuggestions).toProperty(false);
  var menuOpen = suggestionsPresent.and(itemSelected.not());
  var awaitingSearch = userTypedActionStreamCleaned.awaiting(suggestions).map(toSearching).skipDuplicates().and(userTyping);
  // awaitingSearch.log('awaiting-search: ');
  var menuSearching = awaitingSearch.and(itemSelected.not()).and(menuOpen.not());
  var searchBoxValueStream = searchBoxActionStream.map(R.pick(['value', 'actionKey'])).skipDuplicates();
  var valueStream = searchBoxValueStream.map(R.prop('value')).toProperty();

  var valDerivedStreams = valueStream.combine( suggestions, function( val, suggestions) {
    var valObj = V.first({displayText: val}, suggestions);
    return {
      value: val,
      valueObj: valObj,
      optionsObj: suggestions
    }
  });
//  valDerivedStreams.log('valDerivedStreams');

  var valueObjProp = valDerivedStreams.map(R.prop('valueObj'));
  //valueObjProp.log('searchbox-valueObjProp: ');

  var resultStream = Bacon.combineTemplate({
    menuSearching: menuSearching,
    optionObj: suggestions,
    options: optionText,
    menuOpen: menuOpen,
    userTyped: userTypedActionStream,

    actionKey: searchBoxValueStream.map(R.prop('actionKey')).skipDuplicates(),
    value: valueStream,
    valueObj: valueObjProp,
    itemClicked: itemSelected
  });

  //resultStream.log('search-box-result-stream: ');

  resultStream.onValue( StateStore.publish(publishName) );
  return valueObjProp;
}




function addressObjToDisplayString( addressObj ) {
  return [ addressObj.line1, addressObj.line2, addressObj.suburb, addressObj.city + ' '+ addressObj.postcode] // removed addressObj.country
    .filter( function( x ) { return x !== undefined && x !== null && x !== ''; })
    .join(', ');
}
function ajaxForAddress( searchTerms ) {
  var deferred = Q.defer();

  var xmlhttp;
  // compatible with IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {  // TODO: handle timeouts
      var responseObj= JSON.parse(xmlhttp.responseText);  // TODO: catch error
      var responseList = responseObj.results;
      //var displayStringList =  R.map(addressObjToDisplayString, responseList);
      deferred.resolve(responseList);
    }
  }

  xmlhttp.open("POST", window.apiRoot+'signup/address-search', true);
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify({query: searchTerms}));

  return deferred.promise;
}


// Future Development: Originally this function published the results to the given namespace.
// That's convenient, but less than ideal for some situations, such as validating these.  Therefore,
// changed publish to an option with default true, hoping in future to make it default: false and have
// responsiblity for publishing state contained to the stores themselves, as per expected architecture.
function setUpAddressSearchBox(searchBoxActionStream, publishName, outputNamespace, options) {

  var options = R.merge(
    {
      getDisplayTextForOption: addressObjToDisplayString,
      publish: true
    },
    options);
  outputNamespace = outputNamespace || '';

  var addressObjStream =  setUpSearchBox(searchBoxActionStream, publishName, ajaxForAddress, options)
    .filter(function(x) { return x !== undefined; });

  var StateKeyToObjKey = {
    Address1: 'line1',
    Address2: 'line2',
    Suburb: 'suburb',
    City: 'city',
    PostCode: 'postcode'
  };

  function getQualifiedStateKey( localStateKey ) {
    return outputNamespace.length == 0 ? localStateKey : outputNamespace + localStateKey ;
  }

  var addressFields = R.mapObjIndexed(function(objKey, localStateKey) {
    var qualifiedStateKey = getQualifiedStateKey(localStateKey);
    return addressObjStream
      .map(R.prop( objKey ))
      .map(V.replaceNullWithEmptyString)
      .map(V.wrap)
      .map(V.giveKey(qualifiedStateKey));
  }, StateKeyToObjKey);

  V.forEach(function(stream, keyName) {
      stream.changes().log('-'+keyName+': ')
    },
    addressFields);

  //// TODO: this is an intentional bug introduced just for debugging validation : remove this.
  // If uncommented, means the address search always return results with an empty first line, triggering validation failure.
  //addressFields['Address1'] = V.giveKey(getQualifiedStateKey('Address1'), V.wrap(''));

  var templ = Bacon.combineTemplate(addressFields);

  if( options.publish)
    templ.onValue(StateStore.publishTemplateNS(outputNamespace));


  return {
    All: templ, // in the client format: obj with keys { Address1, Address2, Suburb, City, PostCode. } to strings, no nulls.
    Address1: templ.map(R.prop('Address1')),
    Address2: templ.map(R.prop('Address2')),
    Suburb: templ.map(R.prop('Suburb')),
    City: templ.map(R.prop('City')),
    PostCode: templ.map(R.prop('PostCode')),
    Raw: addressObjStream // in the format from the server: obj with keys line1, line2 etc etc which may have null value.
  };
}

// ----
// Form Sections

function getSections(formDef) {
  var result = [];
  var count = 0;
  var currentSection = {
    FormDef: formDef,
    Fields: [],
    SectionNumber: count++
  };

  R.forEach(function(field) {
    currentSection.Fields.push(field);

    if( field.SectionBreak ) {
      result.push(currentSection);

      currentSection = {
        FormDef: formDef,
        Fields: [],
        SectionNumber: count++
      };
    }
  }, formDef.Fields);

  result.push( currentSection );


  if( result.length > 0  && result[ result.length - 1].Fields.length == 0)
    result.length = result.length - 1;

  return result;
}


// Returns the namespace of the field and a list of all the fieldCodes
//
function getSubmissionFieldInfo(formDefCode) {
  var FormDef = V.first( { Code: formDefCode }, ProductInfo.FormDefs);
  var namespace = FormDef.Namespace;

  var allQuestionFieldsIncludingGroups = getQuestionFieldsFromFormDef(FormDef, true);

  // including groups now
  var allFieldCodes = R.map(function(questionFieldDef) {
    return questionFieldDef.Code;
  }, allQuestionFieldsIncludingGroups);

  return {
    Namespace: namespace,
    AllFieldCodes: allFieldCodes // allFieldCodes
  }

}

function getClaimTypeForFormDef( formDef ) {
  return V.lastToken(formDef.Code); // Hack! TODO: do this properly.
}


// ---
module.exports = {
  isValueField: isValueField,
  isGroupFieldDef: isGroupFieldDef,
  getQualifiedName: getQualifiedName,
  createDetailsBusesFromFormDef: createDetailsBusesFromFormDef,
  createHistoryBusesFromFormDef: createHistoryBusesFromFormDef,
  getSections: getSections,
  setUpSearchBox: setUpSearchBox,
  setUpAddressSearchBox: setUpAddressSearchBox,
  getSubmissionFieldInfo: getSubmissionFieldInfo,
  getQuestionFieldsFromFormDef: getQuestionFieldsFromFormDef,
  getClaimTypeForFormDef: getClaimTypeForFormDef,
  getSearchSupportObj: getSearchSupportObj,
  getFieldDefAncestors: getFieldDefAncestors,
  getFieldCodeToAncestorListMap: getFieldCodeToAncestorListMap
}