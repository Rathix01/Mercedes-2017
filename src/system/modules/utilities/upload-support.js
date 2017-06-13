var R = require('ramda');
var Utils = require('./jquery-utils');

var
  inArray = Utils.inArray,
  each = Utils.each,
  param = Utils.param,
  triggerClickEvent = Utils.triggerClickEvent,
  preventDefault = Utils.preventDefault
  ;

// End  Helper Section


/*
 * Based on github's  weixiyen/jquery-filedrop, altered for mosaic non-jquery approach.
 *
 * Default text - jQuery plugin for html5 dragging files from desktop to browser
 *
 * Author: Weixi Yen
 *
 * Email: [Firstname][Lastname]@gmail.com
 *
 * Copyright (c) 2010 Resopollution
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Project home:
 *   http://www.github.com/weixiyen/jquery-filedrop
 *
 * Version:  0.1.0
 *
 * Features:
 *      Allows sending of extra parameters with file.
 *      Works with Firefox 3.6+
 *      Future-compliant with HTML5 spec (will work with Webkit browsers and IE9)
 * Usage:
 *  See README at project homepage
 *
 */

// Add polyfill for XMLHttpRequest.sendAsBinary if it doesn't exist.
// Moved out of the jquery plugin
try {
  if (! XMLHttpRequest.prototype.sendAsBinary) {
    XMLHttpRequest.prototype.sendAsBinary = function(datastr) {
      function byteValue(x) {
        return x.charCodeAt(0) & 0xff;
      }
      var ords = Array.prototype.map.call(datastr, byteValue);
      var ui8a = new Uint8Array(ords);

      // Not pretty: Chrome 22 deprecated sending ArrayBuffer, moving instead
      // to sending ArrayBufferView.  Sadly, no proper way to detect this
      // functionality has been discovered.  Happily, Chrome 22 also introduced
      // the base ArrayBufferView class, not present in Chrome 21.
      if ('ArrayBufferView' in window)
        this.send(ui8a);
      else
        this.send(ui8a.buffer);
    };
  }
} catch (e) {
  console.error(e);
}


function empty() {}

var default_opts = {
  fallback_id: '',
  url: '',
  refresh: 1000,
  paramname: 'file',
  requestType: 'POST',    // just in case you want to use another HTTP verb
  allowedfileextensions:[],
  allowedfiletypes:[],
  maxfiles: 25,           // Ignored if queuefiles is set > 0
  maxfilesize: 2,         // MB file size limit
  queuefiles: 0,          // Max files before queueing (for large volume uploads)
  queuewait: 200,         // Queue wait time if full
  data: {},               // This can be a function that returns the data obj, or a data object itself.
  headers: {},
  sendXRequestedWithHeader: false, // At time of writing, Volo Backend API does not support this header
  uploadImmediately: false, // Added by Volo. If true, uploads as soon as user has chosen file or dropped file on control
  enqueueReplacesCurrentQueue: false, // Added by Volo. Default true. If false, can enqueue files multiple times without clearing previously queued files.
  onFileQueueSet: empty,
  onFileQueueCleared: empty,
  onFileRemoved: empty,
  drop: empty,
  dragStart: empty,
  dragEnter: empty,
  dragOver: empty,
  dragLeave: empty,
  docEnter: empty,
  docOver: empty,
  docLeave: empty,
  beforeEach: empty,
  afterAll: empty,
  rename: empty,
  error: function(err, file, i, status) {
    alert(err);
  },
  uploadStarted: empty,
  uploadFinished: empty,
  progressUpdated: empty,
  globalProgressUpdated: empty,
  speedUpdated: empty
};

// var errorCodes = ["BrowserNotSupported", "TooManyFiles", "FileTooLarge", "FileTypeNotAllowed", "NotFound", "NotReadable", "AbortError", "ReadError", "FileExtensionNotAllowed"];

var errors =
{
  BrowserNotSupported: "BrowserNotSupported",
  TooManyFiles: "TooManyFiles",
  FileTooLarge: "FileTooLarge",
  FileTypeNotAllowed: "FileTypeNotAllowed",
  NotFound: "NotFound",
  NotReadable: "NotReadable",
  AbortError: "AbortError",
  ReadError: "ReadError",
  FileExtensionNotAllowed: "FileExtensionNotAllowed",
  ServerErrorLockboxKeyNotCreated: "ServerErrorLockboxKeyNotCreated",
  ServerErrorNotOtherwiseSpecified: "ServerErrorNotOtherwiseSpecified"
};


// #################################### VoloFilesList structure ########################
// Native FileList object doesn't have ability to add or remove separate Fileslists, or remove them.
// As we want to treat these separately, this structure wraps a list of FilesLists, and maintains information about
// valid indexes in them.  That allows the ability to effectively treat items in FileLists as deletable.

function VoloFilesList() {
  this.entries = [];  // a list of { validIndexes: [], filesList: FilesList }

  Object.defineProperty(this, 'length', {
    get: function() {
      var count = 0;
      each(this.entries, function (entry) {
        count += entry.validIndexes.length;
      });
      return count;
    }
  });
}
VoloFilesList.prototype.concat = function(filesList) {
  if( filesList.length === 0 )
    return;
  var newValidIndexes = R.mapIndexed(function(file, index){ return index; }, filesList);

  // copy filesList to a new array. If we don't do this, then filesList gets altered the next time users
  // click the 'select-file' button.
  var filesArray = [];
  var i = 0;
  for( i = 0; i < filesList.length; ++i ) {
    filesArray.push(filesList[i]);
  }

  var newEntry = { validIndexes: newValidIndexes, filesList: filesArray };
  this.entries.push(newEntry);
}
VoloFilesList.prototype.item = function(idx) {
  var count = 0;
  var i = 0;
  for( i = 0; i < this.entries.length; ++i ) {
    var entry = this.entries[i];
    if( idx < count + entry.validIndexes.length ) {
      // then this entry refers to teh filesList associated with idx.
      var indexInFilesList = entry.validIndexes[ idx - count ];
      return entry.filesList[indexInFilesList];
    }
    count += entry.validIndexes.length;
  }
  // index doesn't refer to a valid item.
  return undefined;
}
VoloFilesList.prototype.remove = function(idx) {
  var count = 0;
  var i = 0;
  for( i = 0; i < this.entries.length; ++i ) {
    var entry = this.entries[i];
    if( idx < count + entry.validIndexes.length ) {
      // then this entry refers to teh filesList associated with idx.
      var indexInFilesList = entry.validIndexes[ idx - count ];
      entry.validIndexes.splice(indexInFilesList, 1); // remove that index from the list of valid indexes

      if( entry.validIndexes.length === 0 ) {
        // remove this entry from the list of entries
        this.entries.splice(i, 1);
      }
      return;
    }

    count += entry.validIndexes.length;
  }
  // index doesn't refer to a valid item.
  return;
}
VoloFilesList.prototype.clear = function() {
  this.entries.length = 0;
}
VoloFilesList.prototype.asArray = function() {
  var result = [];
  var i=0;
  var len = this.length;
  for(i=0; i < len; ++i) {
    result.push(this.item(i));
  }
  return result;
}
VoloFilesList.prototype.log = function(_prefix) {
  var i=0;
  var len = this.length;
  var results = [];
  for(i=0; i < len; ++i) {
    var fileEntry = this.item(i);
    results.push( ''+i+': '+fileEntry.name );
  }
  var prefix = _prefix || '';
  console.log(prefix+' FilesList: ['+len+']: '+ results.join(', '));
}
// #################################### End VoloFilesList structure ########################

// Extend jQuery with 'filedrop' method, that takes some options
var setupUploader = function(fileDropEl, options) {

  var opts = R.merge(default_opts, options),
    global_progress = [],
    doc_leave_timer, stop_loop = false,
    files_count = 0,
    files = new VoloFilesList();

  // need to do this insead of getElementById as fileDropEl may not yet be added to the document...
  var fallBackEl = fileDropEl.querySelector('#'+opts.fallback_id);

  each({
    display: 'none',
    width: 0,
    height: 0
  }, function(k,v) { fallBackEl.style[k] = v });

  each( {
      'drop': drop,
      'dragstart': opts.dragStart,
      'dragenter': dragEnter,
      'dragover': dragOver,
      'dragleave': dragLeave
    },
    function(name, callback) { fileDropEl.addEventListener(name, callback); } );

  each( {
      'drop': docDrop,
      'dragenter': docEnter,
      'dragover': docOver,
      'dragleave': docLeave
    },
    function(name, callback) { document.addEventListener(name, callback); })


  fileDropEl.addEventListener('click', function(e) {
    triggerClickEvent(fallBackEl);
  });

  fallBackEl.addEventListener('change', function(e) {
    opts.drop(e);
    enqueueFiles(e.target.files);
    if( opts.uploadImmediately )
      processUploadQueue();
  });

  function enqueueFiles(filesList) {
    if( opts.enqueueReplacesCurrentQueue ) {
      files.clear();
      files.concat(filesList);
      files_count = files.length;
    }
    else {
      files.concat(filesList);
      files_count = files.length;
    }
    files.log('enqueue - '); // TODO: shotbolt - remove
    opts.onFileQueueSet(files.asArray(), filesList);  //  the whole array, as well as the new files added.
  }

  function removePendingUploadByIndex( fileIndex ) {
    files.remove(fileIndex);
    files_count = files.length;
    opts.onFileRemoved(fileIndex);
    files.log('removePendingUploadByIndex: ');
  }
  // Clear the file queue. Optionally, clear all except those specified in the list of fileIndexes given as param
  function clearFileQueue( silent, _indexesToKeep ) {

    // TODO: test this...
    var indexesToRemove = [];

    var i=0;
    for(i=files_count-1; i >= 0 ; i--) { // ,must be in reverse order
      if(!_indexesToKeep || !R.contains(i, _indexesToKeep))
        indexesToRemove.push(i);
    }


    if( !_indexesToKeep || _indexesToKeep.length === 0) {
      files.clear();
    } else {
      each(indexesToRemove, function(indexToRemove) {
        files.remove(indexToRemove);
      });
    }

    console.log('### clearing file queue from '+files_count+' to '+files.length+'.'); // TODO: remove this logging.
    files_count = files.length;

    files.log('clearFileQueue'); // TODO: shotbolt - remove

    if( !silent )
      opts.onFileQueueCleared(indexesToRemove); // the whole queue, then files removed...?
  }

  // handle drop event
  function drop(e) {
    if( opts.drop.call(fileDropEl, e) === false ) return false;
    if(!e.dataTransfer)  // TODO: verify dataTransfer prop on events support between browsers; w3schools says it is fine.
      return;
    if (e.dataTransfer.files === null || e.dataTransfer.files === undefined || e.dataTransfer.files.length === 0) {
      opts.error(errors.BrowserNotSupported);
      return false;
    }
    enqueueFiles(e.dataTransfer.files);

    if( opts.uploadImmediately )
      processUploadQueue();
    preventDefault(e);
    return false;
  }

  // This returns an object that will be sent as formData
  function getDataObj(fileName, fileIndex) {
    var dataObj = undefined;
    if (typeof( opts.data ) === 'function')
      dataObj = opts.data(fileName, fileIndex);  // index..?
    else
      dataObj = opts.data;
    return dataObj;
  }

  // get a builder for sending the given file
  function getBuilder(filename, filedata, dataObj, mime, boundary, fileIndex) {
    var dashdash = '--',
      crlf = '\r\n',
      builder = '',
      paramname = opts.paramname;

    if (dataObj) {

      // Future development: this takes the data object and puts it through param first, which is
      // not a good way to do it. Instead should use Object.keys(dataObj), and the values those represent
      var params = param(dataObj).replace(/\+/g, '%20').split(/&/);

      each(params, function() {
        var pair = this.split("=", 2),
          name = decodeURIComponent(pair[0]),
          val  = decodeURIComponent(pair[1]);

        if (pair.length !== 2) {
          return;
        }

        builder += dashdash;
        builder += boundary;
        builder += crlf;
        builder += 'Content-Disposition: form-data; name="' + name + '"';
        builder += crlf;
        builder += crlf;
        builder += val;
        builder += crlf;
      });
    }

    if (typeof(paramname) === 'function'){
      paramname = paramname(filename);
    }

    builder += dashdash;
    builder += boundary;
    builder += crlf;
    builder += 'Content-Disposition: form-data; name="' + (paramname||"") + '"';
    builder += '; filename="' + encodeURIComponent(filename) + '"';
    builder += crlf;

    builder += 'Content-Type: ' + mime;
    builder += crlf;
    builder += crlf;

    builder += filedata;
    builder += crlf;

    builder += dashdash;
    builder += boundary;
    builder += dashdash;
    builder += crlf;
    return builder;
  }

  // handle the progress event; with 'this' as the XHRUpload object
  function progress(e) {
    if (e.lengthComputable) {
      var percentage = Math.round((e.loaded * 100) / e.total);
      if (this.currentProgress !== percentage) {

        this.currentProgress = percentage;
        opts.progressUpdated(this.index, this.file, this.currentProgress);

        global_progress[this.global_progress_index] = this.currentProgress;
        globalProgress();

        var elapsed = new Date().getTime();
        var diffTime = elapsed - this.currentStart;
        if (diffTime >= opts.refresh) {
          var diffData = e.loaded - this.startData;
          var speed = diffData / diffTime; // KB per second
          opts.speedUpdated(this.index, this.file, speed);
          this.startData = e.loaded;
          this.currentStart = elapsed;
        }
      }
    }
  }

  // handle the global progress which considers all files in the queue
  function globalProgress() {
    if (global_progress.length === 0) {
      return;
    }

    var total = 0, index;
    for (index in global_progress) {
      if(global_progress.hasOwnProperty(index)) {
        total = total + global_progress[index];
      }
    }

    opts.globalProgressUpdated(Math.round(total / global_progress.length));
  }

  // Respond to an upload
  function processUploadQueue() {
    stop_loop = false;

    if (!files || files.length == 0) { // TODO: determine if this == 0 check is appropriate
      opts.error(errors.BrowserNotSupported);
      return false;
    }

    if (opts.allowedfiletypes.push && opts.allowedfiletypes.length) {
      for(var fileIndex = files.length;fileIndex--;) {
        if(!files.item(fileIndex).type || inArray(files.item(fileIndex).type, opts.allowedfiletypes) < 0) {
          opts.error(errors.FileTypeNotAllowed, files.item(fileIndex));
          return false;
        }
      }
    }

    if (opts.allowedfileextensions.push && opts.allowedfileextensions.length) {
      for(var fileIndex = files.length;fileIndex--;) {
        var allowedextension = false;
        for (i=0;i<opts.allowedfileextensions.length;i++){
          if (files.item(fileIndex).name.substr(files.item(fileIndex).name.length-opts.allowedfileextensions[i].length).toLowerCase()
            == opts.allowedfileextensions[i].toLowerCase()
          ) {
            allowedextension = true;
          }
        }
        if (!allowedextension){
          opts.error(errors.FileExtensionNotAllowed, file.item(fileIndex));
          return false;
        }
      }
    }

    var filesDone = 0,
      filesRejectedIndexes = [];

    if (files_count > opts.maxfiles && opts.queuefiles === 0) {
      opts.error(errors.TooManyFiles);
      return false;
    }

    // Define queues to manage upload process
    var workQueue = [];
    var processingQueue = [];
    var doneQueue = [];

    // Add everything to the workQueue
    for (var i = 0; i < files_count; i++) {
      workQueue.push(i);
    }

    // Helper function to enable pause of processing to wait
    // for in process queue to complete
    var pause = function(timeout) {
      setTimeout(process, timeout);
      return;
    };

    // Process an upload, recursive
    var process = function() {

      var fileIndex;

      if (stop_loop) {
        return false;
      }

      // Check to see if are in queue mode
      if (opts.queuefiles > 0 && processingQueue.length >= opts.queuefiles) {
        return pause(opts.queuewait);
      } else {
        // Take first thing off work queue
        fileIndex = workQueue[0];
        workQueue.splice(0, 1);

        // Add to processing queue
        processingQueue.push(fileIndex);
      }

      try {
        if (beforeEach(files.item(fileIndex)) !== false) {
          if (fileIndex === files_count) {
            return;
          }
          if( files.length === 0 )
          {
            console.error('error: file queue has zero elements');
          }

          var reader = new FileReader(),
            max_file_size = 1048576 * opts.maxfilesize;

          reader.index = fileIndex;
          if (files.item(fileIndex).size > max_file_size) {
            opts.error(errors.FileTooLarge, files.item(fileIndex), fileIndex);
            // Remove from queue
            processingQueue.forEach(function(value, key) {
              if (value === fileIndex) {
                processingQueue.splice(key, 1);
              }
            });
            filesRejectedIndexes.push( fileIndex );
            return true;
          }

          reader.onerror = function(e) {
            filesRejectedIndexes.push( fileIndex );

            switch(e.target.error.code) {
              case e.target.error.NOT_FOUND_ERR:
                opts.error(errors.NotFound);
                return false;
              case e.target.error.NOT_READABLE_ERR:
                opts.error(errors.NotReadable);
                return false;
              case e.target.error.ABORT_ERR:
                opts.error(errors.AbortError);
                return false;
              default:
                opts.error(errors.ReadError);
                return false;
            };
          };

          reader.onloadend = !opts.beforeSend ? send : function (e) {
            opts.beforeSend(files.item(fileIndex), fileIndex, function () { send(e); });
          };

          reader.readAsDataURL(files.item(fileIndex));

        } else {
          filesRejectedIndexes.push( fileIndex );
        }
      } catch (err) {
        // Remove from queue
        processingQueue.forEach(function(value, key) {
          if (value === fileIndex) {
            processingQueue.splice(key, 1);
          }
        });
        opts.error(errors.BrowserNotSupported);
        return false;
      }

      // If we still have work to do,
      if (workQueue.length > 0) {
        process();
      }
    };

    var send = function(e) {

      var fileIndex = (e.srcElement || e.target).index;

      // Sometimes the index is not attached to the
      // event object. Find it by size. Hack for sure.
      if (e.target.index === undefined) {
        e.target.index = getIndexBySize(e.total);
      }

      var xhr = new XMLHttpRequest(),
        upload = xhr.upload,
        file = files.item(e.target.index),
        index = e.target.index,
        start_time = new Date().getTime(),
        boundary = '------multipartformboundary' + (new Date()).getTime(),
        global_progress_index = global_progress.length,
        builder,
        newName = rename(file.name),
        fileName = typeof(newName) === 'string' ? newName : file.name,
        mime = file.type;

      var dataObj = getDataObj(fileName, fileIndex);

      var fileData = atob(e.target.result.split(',')[1]);
      builder = getBuilder(fileName, fileData, dataObj, mime, boundary, fileIndex);

      upload.index = index;
      upload.file = file;
      upload.downloadStartTime = start_time;
      upload.currentStart = start_time;
      upload.currentProgress = 0;
      upload.global_progress_index = global_progress_index;
      upload.startData = 0;
      upload.addEventListener("progress", progress, false);

      // Allow url to be a method
      if (typeof(opts.url) === 'function') {
        xhr.open(opts.requestType, opts.url(), true);
      } else {
        xhr.open(opts.requestType, opts.url, true);
      }

      // moved this after open, in an attempt to prevent InvalidStateError that occurs on IE10
      if (opts.withCredentials) {
        xhr.withCredentials = !! opts.withCredentials;
      }

      xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' + boundary);
      if( opts.sendXRequestedWithHeader )
        xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

      // Add headers
      each(opts.headers, function(k, v) {
        xhr.setRequestHeader(k, v);
      });

      // TODO: shotbolt thinks this looks weird and semi-replicates the polyfill above that should already
      // have been called, but misses the chrome 22 pathway...
      if(!xhr.sendAsBinary){
        xhr.sendAsBinary = function(datastr) {
          function byteValue(x) {
            return x.charCodeAt(0) & 0xff;
          }
          var ords = Array.prototype.map.call(datastr, byteValue);
          var ui8a = new Uint8Array(ords);
          this.send(ui8a.buffer);
        }
      }

      xhr.sendAsBinary(builder);

      global_progress[global_progress_index] = 0;
      globalProgress();

      opts.uploadStarted(index, file, files_count);

      xhr.onload = function() {
        var serverResponse = null;

        if (xhr.responseText) {
          try {
            serverResponse = JSON.parse(xhr.responseText);
          }
          catch (e) {
            serverResponse = xhr.responseText;
          }
        }

        var now = new Date().getTime();
        var timeDiff = now - start_time;



        var result = opts.uploadFinished(index, file, serverResponse, timeDiff, xhr, dataObj);
        filesDone++;

        // Remove from processing queue
        processingQueue.forEach(function(value, key) {
          if (value === fileIndex) {
            processingQueue.splice(key, 1);
          }
        });

        // Add to donequeue
        doneQueue.push(fileIndex);

        // Make sure the global progress is updated
        global_progress[global_progress_index] = 100;
        globalProgress();

        // Pass any errors to the error option.
        // In original design, this meant that the error handler can be fired after opts.uploadFinished ie and 'afterAll' has been fired.
        // This check was moved earlier to prevent that.
        if (xhr.status < 200 || xhr.status > 299) {

          var optionalResponseObj = undefined;
          try {
            optionalResponseObj = JSON.parse(xhr.responseText);
          } catch (e) { optionalResponseObj = undefined; }

          // ie server returns 500 with responseText '{"type":"unknown-exception"}'
          if( xhr.status === 500 && xhr.statusText == "Server Error" && optionalResponseObj && optionalResponseObj.type && optionalResponseObj.type === 'unknown-exception') {
            // NB: Either:
            // 1. Lockbox key not created leads to 'unknown exception' on server OR
            // 2. Database Schema error.  Check the server log to determine if this is the case.
            // It's possible that there is some other unknown exception on server, but generally it means
            // one of these two.
            filesRejectedIndexes.push( fileIndex );
            opts.error(errors.ServerErrorLockboxKeyNotCreated, xhr.statusText, file, fileIndex);
          }
          else {
            // TODO: set these params meaninguflly.
            filesRejectedIndexes.push( fileIndex );
            opts.error(errors.ServerErrorNotOtherwiseSpecified, xhr.statusText, file, fileIndex, xhr.status);
          }
        }

        if (filesDone === files_count) {

          // Clears the successfully uploaded files from the queue, but doesn't trigger a onFileQueueCleared event.
          clearFileQueue(true, filesRejectedIndexes);

          afterAll();
        }


        if (result === false) {
          stop_loop = true;
        }
      };
    };

    // This if check solves a bug where if a user had uploaded a file, then clicked the control to bring up file-browser
    // then clicked cancel, they'd have a queue of length 0, - BUT process() would still be called on that, and fail.
    if( workQueue.length > 0)
    // Initiate the processing loop
      process();
  }

  function getIndexBySize(size) {
    for (var i = 0; i < files_count; i++) {
      if (files.item(i).size === size) {
        return i;
      }
    }

    return undefined;
  }

  function rename(name) {
    return opts.rename(name);
  }

  function beforeEach(file) {
    return opts.beforeEach(file);
  }

  function afterAll() {

    return opts.afterAll();
  }

  function dragEnter(e) {
    clearTimeout(doc_leave_timer);
    preventDefault(e);
    opts.dragEnter.call(this, e);
  }

  function dragOver(e) {
    clearTimeout(doc_leave_timer);
    preventDefault(e);
    opts.docOver.call(this, e);
    opts.dragOver.call(this, e);
  }

  function dragLeave(e) {
    clearTimeout(doc_leave_timer);
    opts.dragLeave.call(this, e);
    e.stopPropagation();
  }

  function docDrop(e) {
    preventDefault(e);
    opts.docLeave.call(this, e);
    return false;
  }

  function docEnter(e) {
    clearTimeout(doc_leave_timer);
    preventDefault(e);
    opts.docEnter.call(this, e);
    return false;
  }

  function docOver(e) {
    clearTimeout(doc_leave_timer);
    preventDefault(e);
    opts.docOver.call(this, e);
    return false;
  }

  function docLeave(e) {
    doc_leave_timer = setTimeout((function(_this) {
      return function() {
        opts.docLeave.call(_this, e);
      };
    })(this), 200);
  }

  function beginQueuedUploads() {
    files.log('beginQueuedUploads');
    // future development: ensure this doesn't suffer problems if beginQueuedUploads is triggerd while uploads in progress.
    return processUploadQueue();
  }

  // public methods
  return {
    name: 'volo-uploader',
    description: 'based on jquery-filedrop',
    version: '0.0.1',
    beginQueuedUploads: beginQueuedUploads,
    removePendingUploadByIndex: removePendingUploadByIndex,
    clearFileQueue: clearFileQueue
  }
};

// Some browsers do not allow direct manipulation of the value of a fileInput element.
// This is a safe way to clear the value of the <input type='file'/> element.
// If it is not cleared, then it will not accept the same file twice in a row, for example.
function resetFileInputEl(inputEl) {
  if( !inputEl )
    return;

  var tempFormEl = inputEl.ownerDocument.createElement('form');
  var nextSib = inputEl.nextElementSibling;
  inputEl.parentElement.appendChild(tempFormEl);
  tempFormEl.appendChild(inputEl);
  tempFormEl.reset();
   if( !nextSib )
    tempFormEl.parentElement.appendChild(inputEl);
  else
    tempFormEl.parentElement.insertBefore(inputEl, nextSib);
  tempFormEl.parentElement.removeChild(tempFormEl);
}

module.exports = {
  setupUploader: setupUploader,
  resetFileInputEl: resetFileInputEl,
  param: param,
  getErrorCodes: function() { return R.clone(errors) }
}