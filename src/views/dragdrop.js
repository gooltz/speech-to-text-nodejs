/**
 * Copyright 2014 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/* global $ */
'use strict';

var handleSelectedFile = require('./fileupload').handleSelectedFile;
var showError = require('./showerror').showError;

exports.initDragDrop = function(ctx) {

  var dragAndDropTarget = $(document);

  dragAndDropTarget.on('dragenter', function(e) {
    e.stopPropagation();
    e.preventDefault();
  });

  dragAndDropTarget.on('dragover', function(e) {
    e.stopPropagation();
    e.preventDefault();
  });

  function handleFileUploadEvent(file) {
    handleSelectedFile(ctx.token, file);
  }

  dragAndDropTarget.on('drop', function(e) {
    e.preventDefault();
    var evt = e.originalEvent;

    if (evt.dataTransfer.files.length == 0)
      return;

    var file = evt.dataTransfer.files[0];
    console.log('File dropped');

    var currentlyDisplaying = localStorage.getItem('currentlyDisplaying');
    if (currentlyDisplaying == 'fileupload' || currentlyDisplaying == 'sample') {
      showError('Currently another file is playing, please stop the file or wait until it finishes');
      return;
    } else if (currentlyDisplaying == 'record') {
      showError('Currently audio is being recorded, please stop recording before playing a sample');
      return;
    }

    handleFileUploadEvent(file);
  });


};
