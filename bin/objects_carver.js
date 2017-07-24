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
	console.log("HELP NEEDED...!");
} else {
	console.log("NO HELP NEEDED...!");
}