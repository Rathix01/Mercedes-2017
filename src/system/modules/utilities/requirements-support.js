var R = require('ramda');
var Bacon = require('baconjs');
var moment = require('moment');

var V = require('./v');

var Constants = require('../constants/constants');
var FileUpload = require('./file-upload');


// TODO: shotbolt - this should probably be: Constants.Requirements.Statuses.new instead
var INITIAL_DOC_REQUIREMENT_STATUS = 'review';


function getDocTypeFromApproveAsPattern(approveAsString) {
  if( !approveAsString || typeof(approveAsString) !== 'string' )
    return approveAsString;
  var approveAsPrefix = 'approve-as-';
  var str = V.trim(approveAsString);
  if( str.indexOf(approveAsPrefix) === 0 )
    return str.substring( approveAsPrefix.length );
  else
    return str;
}


// sendToServerAndMashDocumentId  //
// given a list of validationInfos about requirements, send to server  (eg AdminInteraction.toValidateRequirementsResponseStream)
// then return a stream of responses to those validation request.
var sendToServerAndMashDocumentId = R.curry(function (toValidateRequirementsResponseStream,  validationInfoList ) { // needs to be changed if handling more than one
  if( !validationInfoList || validationInfoList.length !== 1 )
    throw new Error('Not Implemented: currently sendToServerAndMashDocumentId() only handles validating one doc at a time');

  var documentId = validationInfoList[0]['document-id'];
  var requirementUuid = validationInfoList[0]['requirement-uuid'];
  var validatedAsDocType = validationInfoList[0]['validated-as-doc-type'];
  return toValidateRequirementsResponseStream(validationInfoList)
      .map(response => R.merge(
        {
          documentId: documentId,
          requirementUuid: requirementUuid,
          validatedAsDocType: validatedAsDocType
        },
        response
      )
    );
});


// _intendedReqUuid - optional parameter, if present, the intended reqUuid to append to
function getUpdatedReqListDocumentStatus( reqList, currentReqUuid, documentId, status, _intendedReqUuid ) {

  var intendedReqUuid = currentReqUuid === _intendedReqUuid ? undefined : _intendedReqUuid;
  var currentParentReq = V.first( { RequirementUuid: currentReqUuid }, reqList );
  var currentDocInfo = V.first( { documentId: documentId }, currentParentReq.SubmittedDocuments);
  var docInfoWithNewStatus = status !== undefined? R.merge( currentDocInfo, { status: status }) : currentDocInfo;

  return R.map(function(req) {
    if( req.RequirementUuid != currentReqUuid && req.RequirementUuid !== intendedReqUuid)
      return req; // no change
    else if( req.RequirementUuid === intendedReqUuid ) {
      // ie: approved as a different docType than its original one
      return R.merge( req, { SubmittedDocuments: req.SubmittedDocuments.concat( [ docInfoWithNewStatus ]) });
    }
    else {
      if( intendedReqUuid ) {
        // then need to remove it from submittedDocuments. as it has been removed
        var submittedDocumentsWithoutCurrentDoc = R.filter( x=> x.DocumentId != documentId, req.SubmittedDocuments);
        return R.merge( req, { SubmittedDocuments: submittedDocumentsWithoutCurrentDoc })
      }
      else {
        // update status
        var updatedDocForReq = R.map(function (docInfo) {
          if (docInfo.documentId != documentId)
            return docInfo; // no change
          else
            return docInfoWithNewStatus;
        }, req.SubmittedDocuments);

        return R.merge( req, { SubmittedDocuments: updatedDocForReq });
      }
    }
  }, reqList);
}

function getDocStatusForPartialDocInfo(partialDocInfo) {
  return partialDocInfo.valid === true
    ? Constants.Requirements.Statuses.approved
    : partialDocInfo.valid === false
    ? Constants.Requirements.Statuses.rejected
    : INITIAL_DOC_REQUIREMENT_STATUS; // eg review

}


// Based on bacon js Shopping cart tutorial;
// RequirementsList defines a stream that begins with 'initialList' and emits updated RequirementsList structures when
// events are propogated through the streams described in the other parameters here, eg approveResponses, docsUploaded etd.
function RequirementsList(initialList, selectedApplicationRequirementsChanged, approveResponses, rejectResponses, docsUploaded) {
  return Bacon.update(initialList,
    selectedApplicationRequirementsChanged, function(list, selectedApplicationRequirements) {

      var reqs = selectedApplicationRequirements === undefined ? []: selectedApplicationRequirements;
      var reqsWithDocStatus = R.map(function(req){
        var docsWithStatus = R.map(function(partialDocInfo) {
          return R.merge(
            {
              status: getDocStatusForPartialDocInfo(partialDocInfo)
            },
            partialDocInfo);

        }, req.SubmittedDocuments);

        return R.merge( req, { SubmittedDocuments: docsWithStatus });
      }, reqs);
      return reqsWithDocStatus;
    },
    approveResponses, function(reqList, approveResponse){
      var documentId = approveResponse.documentId;
      var reqUuid = approveResponse.requirementUuid;
      var status = approveResponse.success ? Constants.Requirements.Statuses.approved : Constants.Requirements.Statuses.error;

      var docTypeToReqUuid = R.reduce( function(memo, req) {
        return V.mashInto(req.DocumentType, req.RequirementUuid, memo );
      }, {}, reqList);

      var intendedReqUuid = approveResponse.validatedAsDocType
        ? docTypeToReqUuid[ approveResponse.validatedAsDocType ]
        : reqUuid;

      var updatedReqList = getUpdatedReqListDocumentStatus(reqList, reqUuid, documentId, status, intendedReqUuid);

      return updatedReqList;
    },
    rejectResponses, function(reqList, rejectResponse) {
      var documentId = rejectResponse.documentId;
      var reqUuid = rejectResponse.requirementUuid;
      var status = rejectResponse.success ? Constants.Requirements.Statuses.rejected: Constants.Requirements.Statuses.error;
      //console.error('TODO: handle approveResponses')

      var updatedReqList = getUpdatedReqListDocumentStatus(reqList, reqUuid, documentId, status )

      return updatedReqList;
    },
    docsUploaded, function(reqList, uploadedDocList) {

      function isReqAffected( reqUuid ) { return R.any(docItem => docItem.requirementUuid === reqUuid, uploadedDocList) }
      function getDocsForThisReq( reqUuid ) { return R.filter( x => x.requirementUuid === reqUuid, uploadedDocList ) }

      var updatedReqList = R.map(function(req) {
        if( !isReqAffected(req.RequirementUuid))
          return req; // no change
        else {

          var newDocsForThisReq = getDocsForThisReq( req.RequirementUuid );
          var allSubmittedDocsForReq = req.SubmittedDocuments.concat( newDocsForThisReq );

          return R.merge( req, { SubmittedDocuments: allSubmittedDocsForReq });
        }
      }, reqList);

      return updatedReqList;
    }
  );
}

//ReviewDocumentsActions.uploaderActionStreams,
//ReviewDocumentsActions.namespace,
//ReviewDocumentsActions.sublistModelNameToDocType

// documentAction = ReviewDocumentsActions.actions.DocumentAction;



function uploadEventToGridFormat(uploadEvent) {
  return {
    documentId: uploadEvent.serverDocId,
    fileName: uploadEvent.name,
    fileSize: uploadEvent.size,
    submittedAt: moment(),
    description: uploadEvent.dataObj.description,
    status: INITIAL_DOC_REQUIREMENT_STATUS,
    documentType: uploadEvent.documentType,
    requirementUuid: uploadEvent.dataObj['requirement-uuid']
  }
}

// TODO: Shotbolt: Architectural smell.  This method is used to stand up streams for the requirements areas, which is parameterized here
// as it's likely to be used by both policy requirements area as well as claim requiremnets area.
// However it is probably too much code. If we can cut it down I would be more happy to place the contents into
// the policy-requirements store and the claim-requirements store and have that small amount duplicated.

// As it stands, requirements-support needs to hold ~200 lines of code for setting up and stiching together streams
// for handling requirmenets UI and this would be far too much to have duplicated between the stores.

//AdminInteraction.toValidateRequirementsResponseStream
function setupRequirementsListStream(uploaderActionStreams, namespace, sublistModelNameToDocType,  documentAction, validationInfoToResponseStreamF, reqListForSelectedItem ) {

  var uploaderStateByPartialName = FileUpload.setupUploaders(uploaderActionStreams, namespace, sublistModelNameToDocType);
  var uploadEventStreams = FileUpload.getUploadEventStreams(uploaderStateByPartialName);
  var uploadEventsForAllReqs = Bacon.mergeAll( R.values( uploadEventStreams ) );
  var uploadDocEventsInExpectedGridFormat = uploadEventsForAllReqs.map(R.lift(uploadEventToGridFormat));

  // only take actions with a value associated
  var documentActionsStream = documentAction.filter( x => x.value );

  documentActionsStream.log('documentActionsStream: ');

  var rejectDocStream = documentActionsStream
      .filter( x => x.value === Constants.Requirements.Statuses.rejected)
      .map( x => ({
          'document-id': x.tag.documentId,
          'requirement-uuid': x.tag.requirementUuid,
          'valid?': false
        }));

  var acceptDocStream = documentActionsStream
      .filter( x =>
          x.value === Constants.Requirements.Statuses.approved ||
          x.value.indexOf('approve-as-') === 0
      )
      .map( x => ({
          'document-id': x.tag.documentId,
          'requirement-uuid': x.tag.requirementUuid,
          'valid?': true,
          'validated-as-doc-type':
            (x.value === Constants.Requirements.Statuses.approved)
              ? undefined
              : getDocTypeFromApproveAsPattern(x.value)
        }));


  rejectDocStream.log('rejectDocStream: ');
  acceptDocStream.log('acceptDocStream: ');

  var approveResponses = acceptDocStream
      .map(v => [v])
      .flatMap(sendToServerAndMashDocumentId(validationInfoToResponseStreamF));

  approveResponses.log('approveResponses: ');

  var rejectResponses = rejectDocStream
      .map(v => [v])
      .flatMap(sendToServerAndMashDocumentId(validationInfoToResponseStreamF));

  rejectResponses.log('rejectResponses: ');

  // Create the requirements list
  var reqListStream = RequirementsList([],
    reqListForSelectedItem,
    approveResponses,
    rejectResponses,
    uploadDocEventsInExpectedGridFormat
  );

  return reqListStream;
}




// These functions are to support 'allReqsSatisfied'

function statusEqual( obj1, obj2) {
  return obj1.status === obj2.status;
}

// A requirement is considered satisfied if
// 1. it contains at least one approved doc
// 2. it contains no documents of status other than 'approved' or 'rejected'.
function reqSatisfied( req ) {
  return req.SubmittedDocuments.length > 0 &&
    R.containsWith(statusEqual, { status: Constants.Requirements.Statuses.approved}, req.SubmittedDocuments) &&
    R.filter( function(doc) {
      return doc.status !== Constants.Requirements.Statuses.approved &&
        doc.status != Constants.Requirements.Statuses.rejected
    }, req.SubmittedDocuments).length == 0;
}

// Given a list of reqs, return true if there is at least 1 req and that all reqs in the list are satisfied.
function allReqsSatisfied(reqsList) {
  return reqsList.length > 0 &&
    R.all(reqSatisfied, reqsList )
}

module.exports = {
  setupRequirementsListStream: setupRequirementsListStream,
  allReqsSatisfied: allReqsSatisfied
}
