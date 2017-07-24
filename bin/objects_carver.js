/*
 * Part of: "grunt-html-head-urls-min-toggle"
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

var help_needed__RegExp = new RegExp("^--?$", "i");

function scan_arguments(value, index, array) {
	if (index > 1) {
		console.log(index + ": " + value);
	}
}

process.argv.forEach(scan_arguments);