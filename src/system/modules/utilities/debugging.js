var R = require('ramda');
var V = require('./v');

var debuggingOn = window.volosettings && window.volosettings.debugging;
var diffLoggingOn = debuggingOn && window.volosettings.setUpDiffLogging;
function getDiffList(first, second) {
  var result = R.map(function(diffObj) {
    return {
      alteration: diffObj.kind+':'+ R.reduce(function(acc, next) {
        return acc+(
            (typeof(next) === 'number')
              ? '['+next+']'
              : (typeof( next ) === 'string' && next.indexOf(' ') > -1)
              ? '['+next+']'
              : acc.length == 0
              ? ''+next
              : '.'+next
          );
      }, '', diffObj.path),
      lhs: diffObj.lhs,
      rhs: diffObj.rhs
    }

  }, V.getDiff( first, second) || []);
  return result.length > 0 ? result : undefined;
}
function calcDiff( prevState, newState) {
  return {
    state: newState,
    diff: getDiffList( prevState.state, newState)
  };
}

function setUpDiffLogging(stateStream, initState, logToConsole) {
  if( diffLoggingOn ) {
    var diffState = stateStream.scan({
      state: initState,
      diff: {}
    }, calcDiff);
    var stateDiff = diffState.map(R.prop('diff'));

    stateDiff.onValue(onIncomingDiff);
    if( logToConsole )
      stateDiff.log('stateDiff: ');
  }
}


var recentChangesList = [];
var recentChangesHistoryLength = 15;
function onBeforeIncomingState(stateObj) {
  if( debuggingOn ) {
    recentChangesList.push(stateObj);
    var overflowAmount = recentChangesList.length - recentChangesHistoryLength;
    if (overflowAmount > 0)
      recentChangesList.splice(0, overflowAmount); // pop the oldest records off the queue.
  }
}

var recentDiffsList = [];
var recentDiffsHistoryLength = 15;
function onIncomingDiff( diffObj ) {
  if( debuggingOn ) {
    recentDiffsList.push(diffObj);
    var overflowAmount = recentDiffsList.length - recentDiffsHistoryLength;
    if (overflowAmount > 0)
      recentDiffsList.splice(0, overflowAmount); // pop the oldest records off the queue.
  }
}


module.exports = {
  setUpDiffLogging: setUpDiffLogging,
  onBeforeIncomingState: onBeforeIncomingState,
  recentChangesList: recentChangesList,
  recentDiffsList: recentDiffsList
}