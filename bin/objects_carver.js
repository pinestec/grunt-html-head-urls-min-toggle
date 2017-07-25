/*
 * Part of: "grunt-html-head-urls-min-toggle"
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

function check_filename(filename_to_be_verified) {
	if (filename_to_be_verified !== undefined) {
		var valid_filename__pattern = /^(?:[a-zA-Z]{1}\:\\|\/[a-zA-Z]{1}\/)?(?:(?:\.{0,2}(?:\/|\\))|(?:[\w\x20\(\)\.-]+(?:\/|\\)))*[\w-]+\.json$/i;
		if (filename_to_be_verified.search(valid_filename__pattern) !== -1) {
			console.log(filename_to_be_verified);
			return true;
		} else {
			console.log("IRREGULAR FILENAME \"" + filename_to_be_verified + "\" FOUND... PLEASE READJUST...!");
			return false;
		}
	} else {
		console.log("PLEASE STATE A FILENAME...!");
		return false;
	}
}

// var test_string_one = "asS";
var test_string_two = "../../../../././././././Apache24/htdocs/global_options.JSON";
check_filename(test_string_two);
// check_filename(test_string_two);
return false

// Current reference object template that will be written to disk...:
var object_to_be_written = {
  action : [ 'switch', 'clean' ],
  chattiness : [ 'true', 'false' ],
  direction : [ 'min', 'regular' ],
  file_source : [ 'wildcard', 'list' ],
};

var global_file_name = '';

function global_help_output() {
	var plain_file_name_extractor_RegExp = new RegExp("([^/\\\\]*)$");
	var result_array = plain_file_name_extractor_RegExp.exec(process.argv[1]);
	if (result_array !== null) {
		console.log("usage:\t" + result_array[1] + " -f|--file entire_filename.json [-h|--help] \n");
		console.log("Writing internally defined \"reference object\" to disk with the help of \"JSON.stringify\".");
		console
		    .log("Just to be loaded and become an object again with the help \"JSON.parse\" for later use together with any package.");
		console.log("Find the current reference object template at the top of this script: \"" + result_array[1] + "\"\n");
		console.log("optional arguments:");
		console.log("-h, --help\t\t\tShow this help message and exit.");
		console.log("-f, --file proper_filename.json\tState a proper filename to store the \"JSON.stringified\" object in.");
	}
}

var help_needed__pattern = /^--?h(elp)?$/i;
var file_name__pattern = /^--?f(ile)?$/i;
function scan_arguments_for_help(value, index, array) {
	if (index > 1) {
		if (value.search(help_needed__pattern) !== -1) {
			throw 'help';
		}
	}
}

function scan_arguments(value, index, array) {
	if (index > 1) {
		if (value.search(file_name__pattern) !== -1) {
			if (check_filename(array[index + 1])) {
				global_file_name = array[index + 1];
				throw 'file';
			} else {
				return false;
			}
		}
	}
}

try {
	process.argv.forEach(scan_arguments_for_help);
} catch (exception) {
	global_help_output();
	return false;
}

var global_functions = {};
global_functions = require('../tasks/html_head_urls_min_toggle__global_functions.js');
var fileSystem_Module = global_functions.globalModule_Try('fs');

try {
	process.argv.forEach(scan_arguments);
} catch (exception) {
	switch (exception) {
	case 'help':
		global_help_output();
		return false;
	case 'file':
		if (fileSystem_Module.existsSync(global_file_name)) {
			console.log("Overwriting file: \"" + global_file_name + "\"...");
		} else {
			console.log("Creating new file: \"" + global_file_name + "\"...");
		}
		var currentFileHandle = fileSystem_Module.openSync(global_file_name, 'w');
		fileSystem_Module.writeFileSync(currentFileHandle, JSON.stringify(object_to_be_written));
		fileSystem_Module.closeSync(currentFileHandle);
		return true;
	default:
		console.log("DEFAULT EXCEPTION: \"" + exception + "\"");
		return false;
	}
}
global_help_output();