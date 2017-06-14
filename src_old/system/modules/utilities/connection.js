var Bacon = require('baconjs');
var R = require('ramda');
var Q = require('q');

var UploadSupport = require('./upload-support');

// Aim: to convert server-policy-store and server-profile store to use this architecture, then (variously) other pieces of claims server interaction.

function toGetResponseProm(fullUrl, dataObj, expectJsonResult) {
  var d = Q.defer();

  var url = ( dataObj !== undefined && dataObj !== null )
    ? fullUrl + "?" + UploadSupport.param(dataObj)
    : fullUrl;

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      try {
        var response = expectJsonResult
          ? JSON.parse(xmlhttp.responseText)
          : xmlhttp.responseText;
        d.resolve(response);
      } catch( exception ) {
        d.reject( 'could not parse: '+xmlhttp.responseText);
      }
    }
    if(xmlhttp.readyState == 4 && xmlhttp.status >= 400 && xmlhttp.status < 500) { // Forbidden
      try {
        var errorResponse = expectJsonResult
          ? JSON.parse(xmlhttp.responseText)
          : xmlhttp.responseText;
          d.reject(errorResponse);
      } catch( exception ) {
        d.reject( xmlhttp.responseText );
      }
    }
    if(xmlhttp.readyState == 4 & xmlhttp.status == 0) { // could not connect
      d.reject( xmlhttp.responseText || 'unable to connect to server: '+window.apiRoot);
    }
  }
  xmlhttp.open( "GET", url , true ); // plz keep url absolute.
  xmlhttp.send();

  return d.promise;
}
function toGetResponseStream(fullUrl, dataObj, expectJsonResult) {
  return Bacon.fromPromise( toGetResponseProm(fullUrl, dataObj, expectJsonResult) );
}

function toPostResponseProm(fullUrl, dataObj, expectJsonResult) {
  var d = Q.defer();

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function(){
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200){
      try {
        var response = expectJsonResult
          ? JSON.parse(xmlhttp.responseText)
          : xmlhttp.responseText;
        d.resolve(response);
      } catch( exception ) {
        d.reject( 'could not parse: '+xmlhttp.responseText);
      }
    }
    if(xmlhttp.readyState == 4 && xmlhttp.status >= 400 && xmlhttp.status < 500) { // Forbidden
      try {
        var errorResponse = expectJsonResult
          ? JSON.parse(xmlhttp.responseText)
          : xmlhttp.responseText;
        d.reject(errorResponse);
      } catch( exception ) {
        d.reject( xmlhttp.responseText );
      }
    }
    if(xmlhttp.readyState == 4 & xmlhttp.status == 0) { // could not connect
      d.reject( xmlhttp.responseText || 'unable to connect to server: '+window.apiRoot);
    }
  }
  xmlhttp.open( "POST", fullUrl , true ); // plz keep url absolute.
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  // IE10 support: JSON.stringify(undefined) returns undefined, causing server json-parse-exception.
  var postParamString = dataObj === undefined? undefined : JSON.stringify(dataObj);
  if( postParamString)
    xmlhttp.send(postParamString);
  else
    xmlhttp.send();
  
  return d.promise;
}

function toPostResponseStream(fullUrl, dataObj, expectJsonResult) {
  return Bacon.fromPromise(toPostResponseProm(fullUrl, dataObj, expectJsonResult));
}

module.exports = {
  toGetResponseStream: toGetResponseStream,
  toGetResponseProm: toGetResponseProm,
  toPostResponseStream: toPostResponseStream,
  toPostResponseProm: toPostResponseProm
}