var R = require('ramda');
var Bacon = require('baconjs');

var V = require('./v');

var Constants     = require('../constants/constants');
var FileStatuses  = Constants.FileUpload.FileStatuses;
var ActionTypes   = Constants.FileUpload.ActionTypes;

var ActionManager = require('../actions/action-manager');
var StateStore =  require('../stores/state-store');

// setupFileUploadActionsForDocTypes() - function
// Given:
//  documentCodes - a list of documentCodes eg 'ProofOfIncome'
//  an uploaderNamespace - eg 'Tasks_DocRequirement_'
//  and some optional options eg suffix for sublist controls,
// This method will:
// 1. Set up the actions for these uploaders via the action manager and
// 2. returns the uploader streams and a map of sublistModelNames to their corresponding DocType
//    eg: Tasks_DocRequirement_ProofOfIncome_FileInput_Sublist -> 'ProofOfIncome'
function setupFileUploadActionsForDocTypes(documentCodes, uploaderNamespace, _options) {

  var options = R.merge({// defaults:
    sublistControlSuffix: '_FileInput_Sublist'
  }, _options);

  function getSublistModelName(reqCode) {
    return ''+ reqCode + options.sublistControlSuffix;
  }

// Maped by state name eg ProofOfIncome_FileInput_Sublist
  var fileInputSublistModels = R.reduce(function (memo, reqCode) {
    return V.mashInto(getSublistModelName(reqCode), new Bacon.Bus(), memo);
  }, {}, documentCodes);

  ActionManager.registerNS(uploaderNamespace, fileInputSublistModels);

  function toMapEntry(val) {
    return R.createMapEntry(getSublistModelName(val), val);
  }

  var sublistModelNameToDocType = R.compose(R.mergeAll, R.lift(toMapEntry))(documentCodes);

  return {
    uploaderActionStreams: fileInputSublistModels, // NB: without namespace, eg 'ProofOfIncome_FileInput_Sublist' -> Bacon.Bus
    sublistModelNameToDocType: sublistModelNameToDocType, // eg: 'ProofOfIncome_FileInput_Sublist'
    sublistControlSuffix: options.sublistControlSuffix
  };
}




var mapIndexed = R.mapIndexed; // ie in future change to R.addIndex(R.map); // a function which is like R.map but called with 2 parameters: value and index. As R.mapIndexed will be deprecated soon.

// given a list of files of different states (eg uploaded, queued, uploading etc
// and a minimum number of uploaded files needed,
// returns true if that list of fileStates meets the requirement
function uploaderIsSatisfied(filesList, minNumberFilesNeeded) {
  return R.filter(function ( fileInfo ) {
        return fileInfo.status !== FileStatuses.uploaded; }
      , filesList).length === 0
    && filesList.length >= minNumberFilesNeeded;
}


// Given an actionType and an uploaderActionStreamEvent, returns true if that event is of the given action type.
var isActionType = R.curry(function( actionType, uploaderActionStreamEvent) {
  return uploaderActionStreamEvent && uploaderActionStreamEvent.actionType === actionType;
});


// FileGroupState
// For a *single* fileUploader associated with a single document type,
// this method takes an intialListOfFiles and streams depicting actions that can happen to that list,
// and maintains that list given events in those streams.
// It returns a stream describing the state of the FileGroup for that single uploader,
// given the events that have been sent to its.
// Note: Loosely based on Bacon.js shopping cart tutorial.
// #####################################################################################################################
// NOTE: Because of the file upload plugin, there are two different ways of referring to items in the list.
//      Don't get these mixed up!
//
// 1. clientFileQueuedIndex -     the number of the file in the order it was added to
//                                this file uploader. 0,1,2,3,4 etc, Never re-used during a session.
// 2. uploaderSupportFileIndex -  the number of the file in the plugin's queue of files
//                                pending or uploading. Not valid for uploaded files.
// #####################################################################################################################
function FileGroupState(intialFileGroupState, enqueue, setDescription, remove, removeAll, uploadStarted, fileUploaded, fileError, afterAll) {
  return Bacon.update(intialFileGroupState,
    enqueue, function(fileGroupState, action) {

      var getUploadSupportIndexesInUse = R.compose(R.lift(R.prop('uploaderSupportFileIndex')), R.filter(fi => fi.status !== FileStatuses.uploaded));
      var sortedUploadSupportIndexes = R.sortBy( x => x, getUploadSupportIndexesInUse(fileGroupState.filesList) );

      var firstAvailableUploaderSupportFileIndex = sortedUploadSupportIndexes.length > 0
        ? ( R.reverse(sortedUploadSupportIndexes)[0] + 1 )
        : 0;

      var newFileInfos = mapIndexed(function(newFileInfo, idx) {
        return R.merge({
          status: FileStatuses.queued,
          description: '',
          clientFileQueuedIndex: fileGroupState.queuedCount + idx,  // a unique index for each file that is queued. Must be unique per uploader control, but isn't required to be overall for the client.
          uploaderSupportFileIndex: firstAvailableUploaderSupportFileIndex + idx
        }, newFileInfo);
      }, action.data);

      return R.merge(fileGroupState, {
        filesList: fileGroupState.filesList.concat(newFileInfos),
        queuedCount: fileGroupState.queuedCount + newFileInfos.length
      });
    },
    // TODO: broaden: make this 'metadata' about the file, so it is more general than just the description which is our current model.
    setDescription, function(fileGroupState, action){
      var filesListWithUpdatedDescription = R.map(function(fileInfo) {
        if( fileInfo.clientFileQueuedIndex !== action.data.clientFileQueuedIndex)
          return fileInfo;
        else {
          return R.merge(fileInfo, { description: action.data.newDescriptionText });
        }
      }, fileGroupState.filesList);

      return R.merge(fileGroupState, {
        filesList: filesListWithUpdatedDescription
      });
    },
    remove, function(fileGroupState, action){

      var filesListWithoutSubtractee = undefined;
      if( R.has('clientFileQueuedIndex', action.data )) {
        // called when user manually elects to remove a file from the list
        // hence: always clear the file in question, even if it's been uploaded already
        filesListWithoutSubtractee = R.filter(function (fileInfo) {
          return fileInfo.clientFileQueuedIndex !== action.data.clientFileQueuedIndex;
        }, fileGroupState.filesList);
      } else {
        // in this case we expect uploaderFileSupportIndex = x - ie we are removing a queued or error or uploading file.
        // In such cases, uploaderSupportFileIndex of any item with index > x needs to be reduced by 1 to keep these in sync with UploadSupport
        // list.
        var clientFileQueuedIndex = V.first(function(fileInfo){
          return fileInfo.status != FileStatuses.uploaded &
            fileInfo.uploaderSupportFileIndex == action.data.uploaderSupportFileIndex;
        }, fileGroupState.filesList).clientFileQueuedIndex;

        var filesListWithFixedIndexes = R.map(function( fileInfo){
          return fileInfo.uploaderSupportFileIndex <= action.data.uploaderSupportFileIndex
            ? fileInfo
            : R.merge(fileInfo, { uploaderSupportFileIndex: fileInfo.uploaderSupportFileIndex -1 })
        }, fileGroupState.filesList);

        filesListWithoutSubtractee = R.filter(function (fileInfo) {
          return fileInfo.clientFileQueuedIndex !== clientFileQueuedIndex;
        }, filesListWithFixedIndexes);
      }

      var satisfied = uploaderIsSatisfied(filesListWithoutSubtractee, fileGroupState.minNumberFilesNeeded);

      return R.merge(fileGroupState, {
        filesList: filesListWithoutSubtractee,
        satisfied: satisfied
      });

    },
    removeAll, function(fileGroupState, action) {

      throw new Error("Not implemented");

      // This code below is not needed, but will be if we expose a 'clear all' button to the user.
    },
    uploadStarted, function(fileGroupState, action){
      var filesListWithUpdatedItem = R.map(function(fileInfo) {
        if( fileInfo.status === FileStatuses.uploaded ||
          fileInfo.uploaderSupportFileIndex !== action.data.uploaderSupportFileIndex )
          return fileInfo;
        else {
          return R.merge(fileInfo, { status: FileStatuses.uploading, errorMessage: '' }); // error messages are cleared when uploading.
        }
      }, fileGroupState.filesList);

      return R.merge(fileGroupState, {
        filesList: filesListWithUpdatedItem
      });
    },
    fileUploaded, function(fileGroupState, action){
      var filesListWithUpdatedItem = R.map(function(fileInfo) {
        if( fileInfo.status === FileStatuses.uploaded  ||
          fileInfo.uploaderSupportFileIndex !== action.data.uploaderSupportFileIndex)
          return fileInfo;
        else {
          return R.merge(fileInfo,
            {
              status: FileStatuses.uploaded,
              errorMessage: '',
              serverDocId: action.data.serverDocId,
              dataObj: action.data.dataObj // this contains the fields uploaded along with the file, or undefined if there were none.
            }); // serverDocId is the id of the document according to the Volo API backend.
        }
      }, fileGroupState.filesList);

      var satisfied = uploaderIsSatisfied(filesListWithUpdatedItem, fileGroupState.minNumberFilesNeeded);

      return R.merge(fileGroupState, {
        filesList: filesListWithUpdatedItem,
        satisfied: satisfied
      });

    },
    fileError, function(fileGroupState, action){
      var filesListWithUpdatedItem = R.map(function(fileInfo) {
        if( fileInfo.status === FileStatuses.uploaded )
        // ie. Already uploaded,
          return fileInfo;
        else if( action.data.uploaderSupportFileIndex !== undefined &&
          fileInfo.uploaderSupportFileIndex !== action.data.uploaderSupportFileIndex)
        // not a general error and not about this specific file
          return fileInfo;
        else {
          /// ie it applies to this file, OR: it is a general error therefore applies to all files that aren't already uploaded.
          return R.merge(fileInfo, { status: FileStatuses.error, errorMessage: action.data.errorMessage });
        }
      }, fileGroupState.filesList);


      var satisfied = uploaderIsSatisfied(filesListWithUpdatedItem, fileGroupState.minNumberFilesNeeded);

      return R.merge(fileGroupState, {
        filesList: filesListWithUpdatedItem,
        satisfied: satisfied
      });
    },
    afterAll, function(fileGroupState, action){


      // Called when clearing successfully uploaded files,
      // However our UI should still record them as uploaded, so actually just do nothing if they are uploaded already.
      var remainingFiles = R.filter(function(fileInfo) {
        return fileInfo.status != FileStatuses.uploaded;
      }, fileGroupState.filesList);

      // for all remaining FileInfos - ones that weren't state=uploaded, uploaderSupportFileIndex should be reduced
      // in order to keep in sync with UploadSupport's list.
      var newUploaderSupportFileIndexes = R.mapIndexed(function(fileInfo, newUploadSupportIndex) {
        return R.createMapEntry(fileInfo.clientFileQueuedIndex, newUploadSupportIndex);
      }, remainingFiles);
      var clientFileQueuedIndexToNewUploadSupportIndex = R.mergeAll(newUploaderSupportFileIndexes);

      var filesListWithUpdatedIndexes = R.map(function(fileInfo) {
        var hasEntry = R.has(fileInfo.clientFileQueuedIndex, clientFileQueuedIndexToNewUploadSupportIndex);
        return hasEntry
          ? R.merge( fileInfo, { uploaderSupportFileIndex: clientFileQueuedIndexToNewUploadSupportIndex[fileInfo.clientFileQueuedIndex] })
          : fileInfo;

      }, fileGroupState.filesList);


      var satisfied = uploaderIsSatisfied(filesListWithUpdatedIndexes, fileGroupState.minNumberFilesNeeded);

      return R.merge(fileGroupState, {
        filesList: filesListWithUpdatedIndexes,
        satisfied: satisfied
      });
    });
}

// actionInfo.docRequirementNamespace,
// sublistModelNameToRequirementDocType
function setupUploaders(uploaderActionStreams, uploaderNamespace, sublistModelNameToDocType) {
  // uploaderStateByPartialName:
  // This is a MAP of string->stream for the fileGroupStates, for a given fully-qualified state name
  // eg: 'SomePrefix_ProofOfIncome_FileInput_Sublist' -> FileGroupState (stream)
  //
  // Each uploaderModel It provides actions of the types specified in Constants.FileUpload.ActionTypes, which
  // should be processed and used to maintain the file-input-sublist state.


  // This approach is based on Bacon.js Shopping Cart tutorial.
  // UploaderFileLists is a map of UplaoderActionStream name against a stream of FileGroupState 'objects', which are
  // initialized below and are then maintained in consistent manner by handling the 7 or 8 action streams in the FileGroupState constructor.
  var uploaderStateByPartialName = R.mapObjIndexed(function (stream, uploaderName) {
    var filesListInitialState = {
      filesList: [],
      satisfied: false,
      documentType: sublistModelNameToDocType[uploaderName],
      uploadInProgress: false,
      queuedCount: 0,
      minNumberFilesNeeded: 1
    };

    var enqueue = stream.filter(isActionType(ActionTypes.enqueue));
    var setDescription = stream.filter(isActionType(ActionTypes.setDescription));
    var remove = stream.filter(isActionType(ActionTypes.remove));
    var removeAll = stream.filter(isActionType(ActionTypes.removeAll));
    var uploadStarted = stream.filter(isActionType(ActionTypes.uploadStarted));
    var fileUploaded = stream.filter(isActionType(ActionTypes.fileUploaded));
    var fileError = stream.filter(isActionType(ActionTypes.fileError));
    var afterAll = stream.filter(isActionType(ActionTypes.afterAll));

    return FileGroupState(filesListInitialState, enqueue, setDescription, remove, removeAll, uploadStarted, fileUploaded, fileError, afterAll);
  }, uploaderActionStreams);


  // Autoforwarding for all upload controls (ie one store for each requirement type
  StateStore.setAutoForwardingNS(uploaderNamespace, uploaderStateByPartialName);

  return uploaderStateByPartialName;
}


// Looks at the uploaders that were returned by 'setupUploaders()' and returns streams that emits events on successful upload.
// @param uploaderStateByPartialName a map of streams of FileGroupState, with keys of the partial name of the uploader (ie not qualified by full namespace).
// @return newUploadStreamsByPartialName a map of streams, with keys fo the partial name of the uploader (ie not qualifeid by full namespace). Events emitted on new files successfully uploaded.
// TODO: rename
function getUploadEventStreams(uploaderStateByPartialName) {
  var newUploadStreamsByPartialName = R.mapObjIndexed(
    function(fileGroupState, partialName) {
      return fileGroupState.scan({ list: { filesList: [] }}, function(state, next) {
          var oldFilesList = ( state && state.list && state.list.filesList )
          var oldUploadedFiles = R.filter( x => x.status === FileStatuses.uploaded, oldFilesList);
          var oldUploadedIndexes = R.map(R.prop('clientFileQueuedIndex'), oldUploadedFiles);
          var nextFilesList = next && next.filesList;
          var nextUploadedFiles = R.filter( x => x.status === FileStatuses.uploaded, nextFilesList);
          var nextUploadedIndexes = R.map(R.prop('clientFileQueuedIndex'), nextUploadedFiles);
          var newlyAddedFileIndexes = R.filter(x =>
            !R.contains(x, oldUploadedIndexes), nextUploadedIndexes);
          var documentType = next.documentType;

          var newlyAddedFileInfos = R.filter( x => R.contains(x.clientFileQueuedIndex, newlyAddedFileIndexes), nextUploadedFiles);
          var newlyAddedWithDocTypeField = R.map(x => R.merge({ documentType: documentType }, x), newlyAddedFileInfos);


          // Future Development: record deletions of uploaded files as well..?
          return {
            list: next,
            newlyUploaded: newlyAddedWithDocTypeField
          };
        }
      )
      .map(R.prop('newlyUploaded'))
      .filter( x => x.length > 0);  // only emit events if there are newlyUploaded files to record
    }, uploaderStateByPartialName);


  // TODO: This is just for logging; remove this
  var _ = R.mapObjIndexed(function(stream, partialName) {
    stream.log('upload:'+partialName+': ');
    return undefined;
  }, newUploadStreamsByPartialName);

  return newUploadStreamsByPartialName;
}

module.exports = {
  setupFileUploadActionsForDocTypes: setupFileUploadActionsForDocTypes,
  setupUploaders: setupUploaders,
  getUploadEventStreams: getUploadEventStreams
}