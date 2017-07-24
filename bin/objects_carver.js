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
	var dummy_string_one = "/c/Users/hartung/workspace_node_js/html-head-urls-min-toggle/bin/objects_carver.js";
	var dummy_string_two = "C:\\Users\\hartung\\workspace_node_js\\html-head-urls-min-toggle\\bin\\objects_carver.js";
	var plain_file_name_RegExp = new RegExp("[^/]*$");
	var result_array = plain_file_name_RegExp.exec(dummy_string_one);
	if (result_array !== null) {
		console.log(result_array[0]);
	}
} else {
	console.log("NO HELP NEEDED...!");
}