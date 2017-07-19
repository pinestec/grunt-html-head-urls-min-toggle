/*
 * grunt-html-head-urls-min-toggle
 * https://github.com/pinestec/html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks
	grunt
	    .registerMultiTask('html_head_urls_min_toggle',
	        'Point the html-head href and src urls to minified sources and vice versa.', function() {
		        // grunt.log.write("\n" + JSON.stringify(this) + "\n\n");
		        var global_functions = {};
		        global_functions = require('./html_head_urls_min_toggle__global_functions.js');
		        var reference_options_object = {
		          action : [ 'switch', 'clean' ],
		          direction : [ 'min', 'regular' ],
		          file_source : [ 'wildcard', 'list' ]
		        };
		        if (global_functions.private_action_checker(this, reference_options_object, true)) {
			        if (this.data.options.action === 'clean') {
				        console.log("CLEANING SECTION...!");
			        }
			        if (this.data.options.action === 'switch') {
				        if (this.data.options.file_source === 'list') {
					        console.log("SWITCHING SECTION LIST...!");
				        } else {
					        console.log("SWITCHING SECTION WILDCARD...!");
					        for (var i = 0; i < this.data.files.length; i++) {
						        if (this.data.files[i].hasOwnProperty('cwd') && this.data.files[i].hasOwnProperty('src')) {
							        var current_files_array = global_functions.process_wildcard_input(this.data.files[i].src,
							            this.data.files[i].cwd);
							        for (var j = 0; j < current_files_array.length; j++) {
								        grunt.log.write("\t" + (j + 1) + ": \"" + current_files_array[j] + "\"");
								        if (global_functions.toggle_all_head_links(this.data.options.direction, current_files_array[j])) {
									        grunt.log.write("\t- to \""['green'] + this.data.options.direction['green'] + "\" o.k."['green'] +
									            "\n");
								        } else {
									        grunt.log.write("\t- to \""['red'] + this.data.options.direction['red'] +
									            "\">>> Failed...! <<<"['red'] + "\n");
								        }
							        }
						        } else {
							        console.log("MISSING NEEDED \"WILDCARD\" FILE PROPERTIES...!");
						        }
					        }
				        }
			        }
		        }

		        var min_targets_array = [];
		        var regular_targets_array = [];
		        try {
			        min_targets_array = this.data.min_targets;
			        if (typeof min_targets_array === 'undefined') {
				        min_targets_array = [];
			        }
		        } catch (exception) {
			        min_targets_array = [];
		        }
		        try {
			        regular_targets_array = this.data.regular_targets;
			        if (typeof regular_targets_array === 'undefined') {
				        regular_targets_array = [];
			        }
		        } catch (exception) {
			        regular_targets_array = [];
		        }
		        if (min_targets_array.length === 1) {
			        grunt.log.write("\nOne file specified to switch all it's \"head links\" to \"minified sources\"...:\n");
		        } else {
			        grunt.log.write("\n" + min_targets_array.length +
			            " Files specified to switch all their \"head links\" to \"minified sources\"...:\n");
		        }

		        if (min_targets_array.length > 0) {
			        for (var i = 0; i < min_targets_array.length; i++) {
				        grunt.log.write("\t" + (i + 1) + ": \"" + min_targets_array[i] + "\"");
				        if (global_functions.toggle_all_head_links('min', min_targets_array[i])) {
					        grunt.log.write("\t- to \""['green'] + "min"['green'] + "\" o.k."['green'] + "\n");
				        } else {
					        grunt.log.write("\t- to \""['red'] + "min"['red'] + "\" >>> Failed...! <<<"['red'] + "\n");
				        }
			        }
		        } else {
			        grunt.log
			            .write("\n>>> NO \"HTML Files\" listed to switch their \"head links\" to \"minified sources\"... <<<\n");
		        }
		        grunt.log.write("\n");

		        if (regular_targets_array.length > 0) {
			        if (regular_targets_array.length === 1) {
				        grunt.log.write("One file specified to switch all it's \"head links\" to \"regular sources\"...\n");
			        } else {
				        grunt.log.write(regular_targets_array.length +
				            " Files specified to switch all their \"head links\" to \"regular sources\"...\n");
			        }
			        for (var j = 0; j < regular_targets_array.length; j++) {
				        grunt.log.write("\t" + (j + 1) + ": \"" + regular_targets_array[j] + "\"");
				        if (global_functions.toggle_all_head_links('regular', regular_targets_array[j])) {
					        grunt.log.write("\t- to \""['green'] + "regular"['green'] + "\" o.k."['green'] + "\n");
				        } else {
					        grunt.log.write("\t- to \""['red'] + "regular"['red'] + "\" >>> Failed...! <<<"['red'] + "\n");
				        }
			        }
		        } else {
			        grunt.log
			            .write("\n>>> NO \"HTML Files\" listed to switch their \"head links\" to \"regular sources\"... <<<\n");
		        }
	        });
};
