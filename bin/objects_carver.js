/*
 * Part of: "grunt-html-head-urls-min-toggle"
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

var help_needed = false;
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
	help_needed = true;
}

if (help_needed) {
	var plain_file_name_RegExp = new RegExp("([^/\\\\]*)$");
	var result_array = plain_file_name_RegExp.exec(process.argv[1]);
	if (result_array !== null) {
		console.log("usage:\t" + result_array[1] + " entire_filename [-h|--help] \n");
		console.log("Writing internally defined \"reference objects\" to disk with the help of \"JSON.stringify\"...");
		console.log("For later use with other packages.");
	}
} else {
	console.log("NO HELP NEEDED...!");
}