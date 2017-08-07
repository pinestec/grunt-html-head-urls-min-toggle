/*
 * Part of: "grunt-html-head-urls-min-toggle"
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

// Current reference object template that will be written to disk...:
var object_to_be_written = {
  action : [ 'switch', 'clean' ],
  chattiness_level : [ 1, 2, 3 ],
  direction : [ 'min', 'regular' ],
  file_source : [ 'wildcard', 'list' ],
};
// End of current reference object template that will be written to disk...:

var global_file_name = '';
var global_play_string = '';

function global_help_output() {
	var plain_file_name_extractor_RegExp = new RegExp("([^/\\\\]*)$");
	var result_array = plain_file_name_extractor_RegExp.exec(process.argv[1]);
	if (result_array !== null) {
		console
		    .log("usage:\t" + result_array[1] +
		        " [-f|--file  entire_filename.json] [-r|--reverse  entire_filename.json] [-p|--playground [any_string]] [-h|--help] \n");
		console.log("Writing internally defined \"reference object\" to disk with the help of \"JSON.stringify\".");
		console
		    .log("Just to be loaded and become an object again with the help \"JSON.parse\" for later use together with any package.");
		console.log("Find the current reference object template at the top of this script: \"" + result_array[1] + "\"\n");
		console.log("optional arguments:");
		console.log("-h, --help\t\t\t\tShow this help message and exit.");
		console.log("-f, --file proper_filename.json\t\tState a proper filename to store the \"JSON.stringified\" object in.");
		console
		    .log("-r, --reverse proper_filename.json\tState a proper filename to deserialize with \"JSON.parse\" and display the stored object.");
		console.log("-p, --playground [any_string]\t\tHave a playground to check things inside the \"playground_funktion()\".");
	}
}

function check_filename(filename_to_be_verified) {
	if (filename_to_be_verified !== undefined) {
		var valid_filename__pattern = /^(?:[a-zA-Z]{1}\:(?:\\|\/)|\/[a-zA-Z]{1}\/)?(?:(?:\.{0,2}(?:\/|\\))|(?:[\w\x20\(\)\.-]+(?:\/|\\)))*[\w-]+(?:\.[\w-]+)*\.json$/i;
		if (filename_to_be_verified.search(valid_filename__pattern) !== -1) {
			return true;
		} else {
			console.log("IRREGULAR FILENAME \"" + filename_to_be_verified + "\" FOUND... PLEASE READJUST...!");
			return false;
		}
	} else {
		console.log("PLEASE STATE A FILENAME AFTER THE \"-f|--file\" argument...!");
		return false;
	}
}

function playground_funktion() {
	var string_to_be_tested = '';
	var fileName_RegExp = /^([\w\x20-]+)((?:\.+[\w\x20-]*)*)$/;
	var middleName_RegExp = /^(?:(?:\.{0,2}(?:\/|\\))|(?:[\w\x20\(\).-]+(?:\/|\\)))*$/;

	var sample_testString = "just_a-name.txt";
	var sample_testString_two = "just_a-name...........................txt.txt.txt.txt.txt.txt.txt.txt.txt.skjdsad";
	var string_in_the_middle__repeating = "somename/nextname/onemorename/";

	if (global_play_string) {
		string_to_be_tested = global_play_string;
	} else {
		string_to_be_tested = string_in_the_middle__repeating;
	}

	var matching_array = middleName_RegExp.exec(string_to_be_tested);
	if (matching_array !== null) {
		for (var i = 0; i < matching_array.length; i++) {
			console.log(i + ": \"" + matching_array[i] + "\"");
		}
	} else {
		console.log("No regular expression match...!");
	}
}

var help_needed__pattern = /^--?h(elp)?$/i;
var file_name__pattern = /^--?f(ile)?$/i;
var reverse_file_name__pattern = /^--?r(everse)?$/i;
var playground_pattern = /^--?p(layground)?$/i;
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
		if (value.search(reverse_file_name__pattern) !== -1) {
			if (check_filename(array[index + 1])) {
				global_file_name = array[index + 1];
				throw 'reverse';
			} else {
				return false;
			}
		}
		if (value.search(playground_pattern) !== -1) {
			if (array[index + 1]) {
				global_play_string = array[index + 1];
			}
			throw 'playground';
		} else {
			return false;
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
	case 'reverse':
		if (fileSystem_Module.existsSync(global_file_name)) {
			console.log("Checking existing file: \"" + global_file_name + "\"...");
		} else {
			console.log("File: \"" + global_file_name + "\" does not exist... :-(");
		}
		var currentFileHandle = fileSystem_Module.openSync(global_file_name, 'r');
		var reverse_object = JSON.parse(fileSystem_Module.readFileSync(currentFileHandle));
		fileSystem_Module.closeSync(currentFileHandle);
		console.log(); // Just for a new line...
		console.log(reverse_object);
		return true;
	case 'playground':
		playground_funktion();
		return false; // It's just an internal playground...
	default:
		console.log("DEFAULT EXCEPTION: \"" + exception + "\"");
		return false;
	}
}
global_help_output();
