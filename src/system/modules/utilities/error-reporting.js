var R = require('ramda');
require('tracekit'); //Exports window.TraceKit
var Constants = require('../constants/constants')

var logErrorURL = (Constants.apiRoot || Constants.adminApiRoot) + "log-error";

function handleError(errorReport) {
    if (window.volosettings && window.volosettings.debugging && window.console) {
        window.console.log(errorReport);
    } else {
        var xmlhttp = createXMLHTTPObject();
        if (!xmlhttp || !errorReport) {
            return;
        }
        //Different browsers/OSs report their platform through different properties.
        //This is in order from most useful to least useful fields.
        var platform = window.navigator.oscpu
            || window.navigator.platform
            || window.navigator.appVersion
            || window.navigator.cpuClass
            || "";

        var errorData = {
            message: errorReport.message,
            mode: errorReport.mode,
            name: errorReport.name,
            browser: window.navigator.userAgent + " \n " + platform,
            stack: JSON.stringify(R.map(cleanStackFrame, errorReport.stack))
        };

        xmlhttp.open("POST", logErrorURL, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(JSON.stringify(errorData));
    }
}

function cleanStackFrame(stackFrame) {
    //Omit 'args' and 'context' as they can be massively spammy
    return R.pick(['url','line','column','func'], stackFrame);
}

function createXMLHTTPObject() {
    //From http://www.quirksmode.org/js/xmlhttp.html
    var XMLHttpFactories = [
        function () {
            return new XMLHttpRequest();
        },
        function () {
            return new ActiveXObject('Msxml2.XMLHTTP');
        },
        function () {
            return new ActiveXObject('Msxml3.XMLHTTP');
        },
        function () {
            return new ActiveXObject('Microsoft.XMLHTTP');
        }
    ];
    for (var i = 0; i < XMLHttpFactories.length; i++) {
        try {
            return XMLHttpFactories[i]();
        } catch (e) {
        }
    }
}

function attachErrorReporting() {
    //Having a global singleton is gross, but not as gross as the possibility of doubling-up error reports
    if (!window._errorReportingAttached) {
        TraceKit.remoteFetching = false;
        TraceKit.report.subscribe(handleError);
        window._errorReportingAttached = true;
    }
}

module.exports = {
    attachErrorReporting: attachErrorReporting
};