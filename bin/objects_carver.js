/*
 * Part of: "grunt-html-head-urls-min-toggle"
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

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
function scan_arguments(value, index, array) {
	if (index > 1) {
		if (value.search(help_needed__pattern) !== -1) {
			throw exception;
		}
	}
}
try {
	process.argv.forEach(scan_arguments);
} catch (exception) {
	global_help_output();
	return false;
}
var global_options_reference_object = {
  action : [ 'switch', 'clean' ],
  chattiness : [ 'true', 'false' ],
  direction : [ 'min', 'regular' ],
  file_source : [ 'wildcard', 'list' ],
};
console.log("SOME MORE ACTION...!");
// fileSystem_Module.writeSync(currentFileHandle,
// JSON.stringify(options_reference_object));
