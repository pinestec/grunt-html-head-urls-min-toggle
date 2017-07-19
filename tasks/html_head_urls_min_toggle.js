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
	grunt.registerMultiTask('html_head_urls_min_toggle',
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
				    if (this.data.options.file_source === 'list') {
					    console.log("CLEANING SECTION LIST...!");
					    for (var i = 0; i < this.data.custom_files.length; i++) {
						    grunt.log.write("\t" + (i + 1) + ": \"" + this.data.custom_files[i] + "\"");
						    if (global_functions.toggle_all_head_links(this.data.options.direction, this.data.custom_files[i])) {
							    grunt.log.write("\t- to \""['green'] + this.data.options.direction['green'] + "\" o.k."['green'] + "\n");
						    } else {
							    grunt.log.write("\t- to \""['red'] + this.data.options.direction['red'] + "\">>> Failed...! <<<"['red'] +
							        "\n");
						    }
					    }
				    } else {
					    console.log("CLEANING SECTION WILDCARD...!");
					    for (var k = 0; k < this.data.custom_files.length; k++) {
						    if (this.data.custom_files[k].hasOwnProperty('cwd') && this.data.custom_files[k].hasOwnProperty('src')) {
							    var current_files_array = global_functions.process_wildcard_input(this.data.custom_files[k].src,
							        this.data.custom_files[k].cwd);
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

			    if (this.data.options.action === 'switch') {
				    if (this.data.options.file_source === 'list') {
					    console.log("SWITCHING SECTION LIST...!");
					    for (var i = 0; i < this.data.custom_files.length; i++) {
						    grunt.log.write("\t" + (i + 1) + ": \"" + this.data.custom_files[i] + "\"");
						    if (global_functions.toggle_all_head_links(this.data.options.direction, this.data.custom_files[i])) {
							    grunt.log.write("\t- to \""['green'] + this.data.options.direction['green'] + "\" o.k."['green'] + "\n");
						    } else {
							    grunt.log.write("\t- to \""['red'] + this.data.options.direction['red'] + "\">>> Failed...! <<<"['red'] +
							        "\n");
						    }
					    }
				    } else {
					    console.log("SWITCHING SECTION WILDCARD...!");
					    for (var k = 0; k < this.data.custom_files.length; k++) {
						    if (this.data.custom_files[k].hasOwnProperty('cwd') && this.data.custom_files[k].hasOwnProperty('src')) {
							    var current_files_array = global_functions.process_wildcard_input(this.data.custom_files[k].src,
							        this.data.custom_files[k].cwd);
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
	    });
};
