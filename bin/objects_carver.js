/*
 * Part of: "grunt-html-head-urls-min-toggle"
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

var help_needed__RegExp = new RegExp("^\\s*--?h(elp)?\\s*$", "i");

function scan_arguments(value, index, array) {
	if (index > 1) {
		var result_array = help_needed__RegExp.exec(value);
		if (result_array !== null) {
			console.log(result_array[0]);
		}
	}
}

process.argv.forEach(scan_arguments);