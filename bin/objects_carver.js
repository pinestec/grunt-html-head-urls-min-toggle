/*
 * Part of: "grunt-html-head-urls-min-toggle"
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

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
		console.log("usage:\t" + result_array[1] + " entire_filename [-h|--help] \n");
		console.log("Writing internally defined \"reference objects\" to disk with the help of \"JSON.stringify\"...");
		console.log("Just for later use with other packages.\n");
		console.log("optional arguments:");
		console.log("-h, --help\t\tShow this help message and exit");
	}
}

var help_needed__pattern = /^--?h(elp)?$/i;
var file_name__pattern = /^--?f$/i;
function scan_arguments(value, index, array) {
	if (index > 1) {
		if (value.search(help_needed__pattern) !== -1) {
			throw 'help';
		}
		if (value.search(file_name__pattern) !== -1) {
			global_file_name = array[index + 1];
			throw 'file';
		}
	}
}

try {
	process.argv.forEach(scan_arguments);
} catch (exception) {
	switch (exception) {
	case 'help':
		global_help_output();
		return false;
	case 'file':
		console.log(global_file_name);
		break;
	default:
		console.log("DEFAULT: " + exception);
		break;
	}
}

var global_functions = {};
global_functions = require('../tasks/html_head_urls_min_toggle__global_functions.js');
var fileSystem_Module = global_functions.globalModule_Try('fs');
var currentFileHandle = fileSystem_Module.openSync("./etc/global_options.json", 'w');
fileSystem_Module.writeFileSync(currentFileHandle, JSON.stringify(object_to_be_written));
fileSystem_Module.closeSync(currentFileHandle);
