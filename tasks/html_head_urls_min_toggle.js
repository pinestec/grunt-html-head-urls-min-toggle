/*
 * grunt-html-head-urls-min-toggle
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	grunt
	    .registerMultiTask(
	        'html_head_urls_min_toggle',
	        'Point the html-head href and src urls to minified sources and vice versa.',
	        function() {
		        var global_functions = {};
		        global_functions = require('./html_head_urls_min_toggle__global_functions.js');
		        global_functions.global_casual__options__servant(this);
		        var reference_options_switch_object = {
		          action : [ 'switch', 'clean' ],
		          direction : [ 'min', 'regular' ],
		          file_source : [ 'wildcard', 'list' ]
		        };
		        if (global_functions.private_action_checker(this, reference_options_switch_object, false)) {
			        if (this.data.options.action === 'switch') {
				        if (this.data.options.file_source === 'list') {
					        for (var l = 0; l < this.data.custom_files.length; l++) {
						        grunt.log.write("\t" + (l + 1) + ": \"" + this.data.custom_files[l] + "\"");
						        if (global_functions.toggle_all_head_links(this.data.options.direction, this.data.custom_files[l])) {
							        grunt.log.write("\t- to \""['green'] + this.data.options.direction['green'] + "\" o.k."['green'] +
							            "\n");
						        } else {
							        grunt.log.write("\t- to \""['red'] + this.data.options.direction['red'] +
							            "\">>> Failed...! <<<"['red'] + "\n");
						        }
					        }
				        } else {
					        for (var m = 0; m < this.data.custom_files.length; m++) {
						        if (this.data.custom_files[m].hasOwnProperty('cwd') && this.data.custom_files[m].hasOwnProperty('src')) {
							        var current_second_files_array = global_functions.process_wildcard_input(
							            this.data.custom_files[m].src, this.data.custom_files[m].cwd);
							        for (var n = 0; n < current_second_files_array.length; n++) {
								        grunt.log.write("\t" + (n + 1) + ": \"" + current_second_files_array[n] + "\"");
								        if (global_functions.toggle_all_head_links(this.data.options.direction,
								            current_second_files_array[n])) {
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
		        } else {
			        var reference_options_clean_object = {
			          action : [ 'clean' ],
			          file_source : [ 'wildcard', 'list' ]
			        };
			        if (global_functions.private_action_checker(this, reference_options_clean_object, false)) {
				        if (this.data.options.file_source === 'list') {
					        for (var i = 0; i < this.data.custom_files.length; i++) {
						        grunt.log.write("\t" + (i + 1) + ": \"" + this.data.custom_files[i] + "\"");
						        if (global_functions.end_of_line_refresh(this.data.custom_files[i])) {
							        grunt.log.write("\t- action \""['green'] + this.data.options.action['green'] + "\" o.k."['green'] +
							            "\n");
						        } else {
							        grunt.log.write("\t- action \""['red'] + this.data.options.action['red'] +
							            "\" >>> Failed...! <<<"['red'] + "\n");
						        }
					        }
				        } else {
					        for (var k = 0; k < this.data.custom_files.length; k++) {
						        if (this.data.custom_files[k].hasOwnProperty('cwd') && this.data.custom_files[k].hasOwnProperty('src')) {
							        var current_files_array = global_functions.process_wildcard_input(this.data.custom_files[k].src,
							            this.data.custom_files[k].cwd);
							        for (var j = 0; j < current_files_array.length; j++) {
								        grunt.log.write("\t" + (j + 1) + ": \"" + current_files_array[j] + "\"");
								        if (global_functions.end_of_line_refresh(current_files_array[j])) {
									        grunt.log.write("\t- action \""['green'] + this.data.options.action['green'] +
									            "\" o.k."['green'] + "\n");
								        } else {
									        grunt.log.write("\t- action \""['red'] + this.data.options.action['red'] +
									            "\" >>> Failed...! <<<"['red'] + "\n");
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
