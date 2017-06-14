var Bacon = require('baconjs');
var R = require('ramda');
var Q = require('q');

var V = require('../../utilities/v');
var Constants = require('../../../constants/constants')


// Note: These can represent a practice, in which case firstname, lastname and title are blank.
function toClientResultObj( serverDoctorResult, practitionerType ) {
  return {
    DoctorId: serverDoctorResult['doctor-id'],
    FirstName: serverDoctorResult['first-name'],
    LastName: serverDoctorResult['last-name'],
    Title: serverDoctorResult['title'],
    OrgName: serverDoctorResult['org-name'],
    Suburb: serverDoctorResult['suburb'],
    Speciality: practitionerType == 'gp' ? 'GP' : 'Specialist',
    IsPractice: !serverDoctorResult['first-name'] && ! serverDoctorResult['last-name'] && ! serverDoctorResult['title']
  };
}

// Returns a promise
function getPractitionerSearchPromise(practitionerType, searchText) {

  var d = Q.defer();

  var searchUrl =  Constants.apiRoot + 'claim/doctor-search';
  var data = {
    "query": searchText,
    "type": practitionerType // eg 'gp'
  };

  var xmlhttp;
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      var searchResult = JSON.parse(xmlhttp.responseText);
      var resultsArray = R.map(toClientResultObj, searchResult.results)
      d.resolve( resultsArray );
    }
    if(xmlhttp.readyState == 4 && xmlhttp.status == 401) { // Forbidden
      //console.log('identity request failed: '+xmlhttp.responseText );
      d.reject( xmlhttp.responseText );
    }
    if(xmlhttp.readyState == 4 & xmlhttp.status == 0) { // could not connect
      //console.log('identity request failed: '+'unable to connect to server');
      d.reject( xmlhttp.responseText || 'unable to connect to server: '+window.apiRoot);
    }
  }

  xmlhttp.open( "POST", searchUrl , true );
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(data));

  return d.promise;
}

var getGpSearchPromise = getPractitionerSearchPromise.bind(this, 'gp');
var getSpecialistSearchPromise = getPractitionerSearchPromise.bind(this, 'specialist');


function practitionerToString(practitionerObj) {
  if( !practitionerObj )
    return '';
  else if( practitionerObj.IsPractice ) {
    return '' + practitionerObj.OrgName + ' - ' + practitionerObj.Suburb;
  } else {
    return '' + ( practitionerObj.Title ? practitionerObj.Title  + '. ' : '' ) +
      practitionerObj.FirstName + ' ' + practitionerObj.LastName + ' - ' +
      practitionerObj.OrgName + ' - ' + practitionerObj.Suburb;
  }
}

function practitionerToContactDetails(practitionerObj) {
  if( practitionerObj.IsPractice ) {
    return '' + practitionerObj.OrgName + ' - ' + practitionerObj.Suburb;
  } else {
    return '' + ( practitionerObj.Title ? practitionerObj.Title  + '. ' : '' ) +
      practitionerObj.FirstName + ' ' + practitionerObj.LastName + ' - ' +
      practitionerObj.OrgName + ' - ' + practitionerObj.Suburb;
  }
}

module.exports = {
  GpSearch: getGpSearchPromise,
  SpecialistSearch: getSpecialistSearchPromise,
  PractitionerToString: practitionerToString,
  PractitionerToContactDetails: practitionerToContactDetails
}