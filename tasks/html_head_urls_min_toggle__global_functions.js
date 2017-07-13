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

function dump_debug_string(string) {
	var fileSystem_Module = globalModule_Try('fs');
	var inHouseFileHandle = fileSystem_Module.openSync("./local_debug_dump.txt", 'a');
	fileSystem_Module.writeSync(inHouseFileHandle, string);
	fileSystem_Module.closeSync(inHouseFileHandle);
}

// var endMarker = " MIN_END\n";
// dump_debug_string("1: " + regExp_ResultArray[1] + ".min" +
// regExp_ResultArray[2] + carriageReturn + endMarker);
// dump_debug_string("2 no_cr: " + regExp_ResultArray[1] + endMarker);
// dump_debug_string("3 no_cr: " + regExp_ResultArray[1] + ".min" + endMarker);
// dump_debug_string("4 no_cr: " + regExp_ResultArray[1] + ".min" +
// regExp_ResultArray[2] + endMarker);
// dump_debug_string("5: " + regExp_ResultArray[1] + ".min" +
// regExp_ResultArray[2] + carriageReturn + endMarker);
// dump_debug_string("TARGET no_cr: " + regExp_ResultArray[2] + endMarker);
//
// var endMarker = " REGULAR_END\n";
// dump_debug_string("1: " + regExp_ResultArray[1] + regExp_ResultArray[2] +
// carriageReturn + endMarker);
// dump_debug_string("2 no_cr: " + regExp_ResultArray[1] + endMarker);
// dump_debug_string("3 no_cr: " + regExp_ResultArray[1] + regExp_ResultArray[2]
// + endMarker);
// dump_debug_string("4: " + regExp_ResultArray[1] + regExp_ResultArray[2] +
// carriageReturn + endMarker);
// dump_debug_string("TARGET no_cr: " + regExp_ResultArray[2] + endMarker);

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

function array_from_file(entire_fileName) {
	var fileSystem_Module = globalModule_Try('fs');
	if (fileSystem_Module.existsSync(entire_fileName)) {
		var targetFile_LineArray = fileSystem_Module.readFileSync(entire_fileName, 'utf8', 'r').toString().split('\n');
		return targetFile_LineArray;
	} else {
		message_locator_service("TARGET FILE DOES NOT EXIST...!");
		return false;
	}
}

// Switching html head area to minified targets...
function toMin(headStart, headEnd, carriageReturn, contentArray) {
	var changed = false;
	var hasMin_RegExp = new RegExp(
	    "^(.*(?:href|src)\\s*\\=\\s*(?:\"|\')?.+)(?:\\.min)+(\\.(?:js|css)[\\x20\\t]*(?:\"|\')?[^\\x0d\\x0a]*)", "i");
	var carelessAboutMin_RegExp = new RegExp(
	    "^(.*(?:href|src)\\s*\\=\\s*(?:\"|\')?.+)(\\.(?:js|css)[\\x20\\t]*(?:\"|\')?[^\\x0d\\x0a]*)", "i");
	for (var i = (headStart + 1); i < headEnd; i++) {
		if (hasMin_RegExp.exec(contentArray[i]) === null) {
			var regExp_ResultArray = carelessAboutMin_RegExp.exec(contentArray[i]);
			if (regExp_ResultArray !== null) {
				contentArray[i] = regExp_ResultArray[1] + ".min" + regExp_ResultArray[2] + carriageReturn;
				if (!changed) {
					changed = true;
				}
			}
		}
	}
	if (changed) {
		return contentArray;
	} else {
		return false;
	}
}

// Switching html head area to regular targets...
function toRegular(headStart, headEnd, carriageReturn, contentArray) {
	var changed = false;
	var minSuspect_RegExp = new RegExp(
	    "^(.*(?:href|src)\\s*\\=\\s*(?:\"|\')?.+)\\.min(\\.(?:js|css)[\\x20\\t]*(?:\"|\')?[^\\x0d\\x0a]*)", "i");
	for (var i = (headStart + 1); i < headEnd; i++) {
		var regExp_ResultArray = minSuspect_RegExp.exec(contentArray[i]);
		if (regExp_ResultArray !== null) {
			contentArray[i] = regExp_ResultArray[1] + regExp_ResultArray[2] + carriageReturn;
			if (!changed) {
				changed = true;
			}
		}
	}
	if (changed) {
		return contentArray;
	} else {
		return false;
	}
}

function delete_writingArray_ToFile(fileName, array) {
	var fileSystem_Module = globalModule_Try('fs');
	if (fileSystem_Module.existsSync(fileName)) {
		fileSystem_Module.unlinkSync(fileName);
	}
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
  process_wildcard_input : function(direction, source, directory) {
	  var wildcard_extractor_RegExp = new RegExp("^\\*(.+)$");
	  var result_array = wildcard_extractor_RegExp.exec(source);
	  var final_files_array = [];
	  if (result_array) {
		  var tail_string = result_array[1];
		  var prepared_tail = tail_string.replace(/\./ig, "\\.");
		  var wildcard_RegExp = new RegExp("^(.+" + prepared_tail + ")$", "i");
		  var fileSystem_Module = globalModule_Try('fs');
		  var raw_file_array = fileSystem_Module.readdirSync(directory);
		  var targets_file_array = [];
		  var counter = 1;
		  for (var i = 0; i < raw_file_array.length; i++) {
			  var single_file_result_array = wildcard_RegExp.exec(raw_file_array[i]);
			  if (single_file_result_array) {
				  console.log(counter + ": " + single_file_result_array[1]);
				  final_files_array.push(directory + single_file_result_array[1]);
				  counter++;
			  }
		  }
		  for (var j = 0; j < final_files_array.length; j++) {
			  console.log(final_files_array[j]);
		  }
	  } else {
		  message_locator_service("NO VALID WILDCARD FOUND...!");
	  }
	  console.log("\n");
  },

  toggle_all_head_links : function(direction, file) {
	  var pointToMin = false;
	  if (direction === 'min') {
		  pointToMin = true;
	  }
	  var targetFile_LineArray = array_from_file(file);
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
			  if (targetFile_LineArray) {
				  delete_writingArray_ToFile(file, targetFile_LineArray);
				  return true;
			  } else {
				  return true;
			  }
		  } else {
			  targetFile_LineArray = toRegular(headStart, headEnd, windowsNeeded_carriageReturn, targetFile_LineArray);
			  if (targetFile_LineArray) {
				  delete_writingArray_ToFile(file, targetFile_LineArray);
				  return true;
			  } else {
				  return true;
			  }
		  }
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
