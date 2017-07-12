'use strict';

function globalModule_Try(moduleString) {
	try {
		return require(moduleString);
	} catch (exception) {
		console.log("FAILED TO LOAD: \"" + moduleString + "\"");
		console.log(exception);
		return null;
	}
}

function message_locator_service(mainMessage) {
	var path_Module = globalModule_Try('path');
	var stackTrace_Module = globalModule_Try('stack-trace');
	var currentFrame = stackTrace_Module.get()[1];
	console.log(mainMessage + " >>> \"" + path_Module.basename(currentFrame.getFileName()) + ":" +
	    currentFrame.getLineNumber() + "\"\n");
}

function spot_the_head(htmlLineArray) {
	var headAreaMark_Array = [ -1, -1 ];
	var headMark_RegExp = new RegExp("<\\s*\\/?\\s*head\\s*>", "i");
	for (var i = 0; i < htmlLineArray.length; i++) {
		if (headMark_RegExp.exec(htmlLineArray[i]) !== null) {
			if (headAreaMark_Array[0] === -1) {
				headAreaMark_Array[0] = i;
			} else {
				headAreaMark_Array[1] = i;
				break;
			}
		}
	}
	if (headAreaMark_Array[0] === -1 || headAreaMark_Array[1] === -1) {
		message_locator_service("HEAD AREA BOUNDRIES BUGGY OR NOT FOUND AT ALL...!");
		return false;
	} else {
		return headAreaMark_Array;
	}
}

function carriage_return_needed() {
	var os_Module = globalModule_Try('os');
	var windowsSpotter_RegExp = new RegExp("windows", "i");
	if (windowsSpotter_RegExp.exec(os_Module.type()) !== null) {
		return true;
	} else {
		return false;
	}
}

function end_of_line_clean_save(fileName, array, carriageReturn) {
	var carriageReturnString = "";
	if (carriageReturn) {
		carriageReturnString = "\r";
	}
	var fileSystem_Module = globalModule_Try('fs');
	var currentFileHandle = fileSystem_Module.openSync(fileName, 'w');

	var lineSpotter_RegExp = new RegExp("^([\\x20\\x09]*)(.*)\\x0d*$", "i");
	var initialLineResultArray = lineSpotter_RegExp.exec(array[0]);
	if (initialLineResultArray !== null) {
		if (initialLineResultArray[2]) {
			fileSystem_Module.writeSync(currentFileHandle, initialLineResultArray[1] + initialLineResultArray[2] +
			    carriageReturnString + "\n");
		}
	} else {
		message_locator_service("MISSED THE INITIAL LINE...!");
		return false;
	}
	for (var j = 1; j < (array.length - 1); j++) {
		var lineResultArray = lineSpotter_RegExp.exec(array[j]);
		if (lineResultArray !== null) {
			if (j === (array.length - 2)) {
				var nextToLast_ResultArray = lineSpotter_RegExp.exec(array[array.length - 1]);
				if (!nextToLast_ResultArray[2]) {
					fileSystem_Module.writeSync(currentFileHandle, lineResultArray[1] + lineResultArray[2]);
				} else {
					fileSystem_Module.writeSync(currentFileHandle, lineResultArray[1] + lineResultArray[2] + carriageReturnString +
					    "\n");
				}
			} else {
				fileSystem_Module.writeSync(currentFileHandle, lineResultArray[1] + lineResultArray[2] + carriageReturnString +
				    "\n");
			}
		} else {
			message_locator_service("MISSED A LINE...!");
			return false;
		}
	}
	var finalLineResultArray = lineSpotter_RegExp.exec(array[array.length - 1]);
	if (finalLineResultArray !== null) {
		if (finalLineResultArray[2]) {
			fileSystem_Module.writeSync(currentFileHandle, finalLineResultArray[1] + finalLineResultArray[2]);
		}
	} else {
		message_locator_service("MISSED THE FINAL LINE...!");
		return false;
	}
	fileSystem_Module.closeSync(currentFileHandle);
	return true;
}

function array_from_file_delete(entire_fileName) {
	var fileSystem_Module = globalModule_Try('fs');
	if (fileSystem_Module.existsSync(entire_fileName)) {
		var targetFile_LineArray = fileSystem_Module.readFileSync(entire_fileName, 'utf8', 'r').toString().split('\n');
		fileSystem_Module.unlinkSync(entire_fileName);
		return targetFile_LineArray;
	} else {
		message_locator_service("TARGET FILE DOES NOT EXIST...!");
		return false;
	}
}

// Switching html head area to minified targets...
function toMin(headStart, headEnd, carriageReturn, contentArray) {
	var hasMin_RegExp = new RegExp("^(.*(?:href|src)\\s*\\=\\s*\"?.+)(?:\\.min)+(\\.(?:js|css)\\s*\"?.*)", "i");
	var carelessAboutMin_RegExp = new RegExp("^(.*(?:href|src)\\s*\\=\\s*\"?.+)(\\.(?:js|css)\\s*\"?.*)", "i");
	for (var i = (headStart + 1); i < headEnd; i++) {
		if (hasMin_RegExp.exec(contentArray[i]) === null) {
			var regExp_ResultArray = carelessAboutMin_RegExp.exec(contentArray[i]);
			if (regExp_ResultArray !== null) {
				contentArray[i] = regExp_ResultArray[1] + ".min" + regExp_ResultArray[2] + carriageReturn;
			}
		}
	}
	return contentArray;
}

// Switching html head area to regular targets...
function toRegular(headStart, headEnd, carriageReturn, contentArray) {
	var minSuspect_RegExp = new RegExp("^(.*(?:href|src)\\s*\\=\\s*\"?.+)\\.min(\\.(?:js|css)\\s*\"?.*)", "i");
	for (var i = (headStart + 1); i < headEnd; i++) {
		var regExp_ResultArray = minSuspect_RegExp.exec(contentArray[i]);
		if (regExp_ResultArray !== null) {
			contentArray[i] = regExp_ResultArray[1] + regExp_ResultArray[2] + carriageReturn;
		}
	}
	return contentArray;
}

function writingArray_ToFile(fileName, array) {
	var fileSystem_Module = globalModule_Try('fs');
	var inHouseFileHandle = fileSystem_Module.openSync(fileName, 'w');
	for (var i = 0; i < (array.length - 1); i++) {
		fileSystem_Module.writeSync(inHouseFileHandle, array[i] + "\n");
	}
	if (array[array.length - 1]) {
		fileSystem_Module.writeSync(inHouseFileHandle, array[array.length - 1]);
	}
	fileSystem_Module.closeSync(inHouseFileHandle);
}

module.exports = {
  toggle_all_head_links : function(direction, file) {
	  var pointToMin = false;
	  if (direction === 'min') {
		  pointToMin = true;
	  }
	  var targetFile_LineArray = array_from_file_delete(file);
	  if (targetFile_LineArray) {
		  var windowsNeeded_carriageReturn = "";
		  if (carriage_return_needed) {
			  windowsNeeded_carriageReturn = "\r";
		  }
		  var headStart = spot_the_head(targetFile_LineArray)[0];
		  var headEnd = spot_the_head(targetFile_LineArray)[1];
		  // Actual array manipulation...
		  if (pointToMin) {
			  targetFile_LineArray = toMin(headStart, headEnd, windowsNeeded_carriageReturn, targetFile_LineArray);
		  } else {
			  targetFile_LineArray = toRegular(headStart, headEnd, windowsNeeded_carriageReturn, targetFile_LineArray);
		  }
		  writingArray_ToFile(file, targetFile_LineArray);
		  return true;
	  } else {
		  message_locator_service("FAILED TO GET VALID DATA ARRAY...!");
		  return false;
	  }
  },

  end_of_line_refresh : function(file) {
	  console.log("CURRENTLY REFRESHING FILE: \"" + file + "\"");
	  var targetFile_LineArray = array_from_file_delete(file);
	  if (targetFile_LineArray) {
		  return end_of_line_clean_save(file, targetFile_LineArray, carriage_return_needed());
	  } else {
		  message_locator_service("FAILED TO GET VALID DATA ARRAY...!");
		  return false;
	  }
  }
};
