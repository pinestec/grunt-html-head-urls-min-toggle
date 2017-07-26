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
		        // global_functions.serialize_object_to_disk(this,
		        // './etc/this_sample_object.json');
		        var fileSystem_Module = global_functions.globalModule_Try('fs');
		        var currentFileHandle = fileSystem_Module.openSync("./etc/global_options.json", 'r');
		        var options_reference_object = JSON.parse(fileSystem_Module.readFileSync(currentFileHandle));
		        fileSystem_Module.closeSync(currentFileHandle);

		        var action__current_value = global_functions.casual__options_property_servant(this.data.options,
		            options_reference_object, 'action');
		        if (action__current_value) {
			        switch (action__current_value) {
			        case 'switch':
				        var file_source = global_functions.casual__options_property_servant(this.data.options,
				            options_reference_object, 'file_source');
				        if (file_source === 'list') {
					        for (var il = 0; il < this.data.custom_files.length; il++) {
						        grunt.log.write("\t" + (il + 1) + ": \"" + this.data.custom_files[il] + "\"");
						        if (global_functions.toggle_all_head_links(this.data.options.direction, this.data.custom_files[il])) {
							        grunt.log.write("\t- to \""['green'] + this.data.options.direction['green'] + "\" o.k."['green'] +
							            "\n");
						        } else {
							        grunt.log.write("\t- to \""['red'] + this.data.options.direction['red'] +
							            "\">>> Failed...! <<<"['red'] + "\n");
						        }
					        }
				        }
				        if (file_source === 'wildcard') {
					        for (var ow = 0; ow < this.data.custom_files.length; ow++) {
						        if (this.data.custom_files[ow].hasOwnProperty('cwd') &&
						            this.data.custom_files[ow].hasOwnProperty('src')) {
							        var inner_files_array = global_functions.process_wildcard_input(this.data.custom_files[ow].src,
							            this.data.custom_files[ow].cwd);
							        for (var iw = 0; iw < inner_files_array.length; iw++) {
								        grunt.log.write("\t" + (iw + 1) + ": \"" + inner_files_array[iw] + "\"");
								        if (global_functions.toggle_all_head_links(this.data.options.direction, inner_files_array[iw])) {
									        grunt.log.write("\t- to \""['green'] + this.data.options.direction['green'] + "\" o.k."['green'] +
									            "\n");
								        } else {
									        grunt.log.write("\t- to \""['red'] + this.data.options.direction['red'] +
									            "\">>> Failed...! <<<"['red'] + "\n");
								        }
							        }
						        } else {
							        console.log("MISSING NEEDED \"WILDCARD\" FILE PROPERTIES...!");
							        break;
						        }
					        }
					        break;
				        }
				        break;
			        case 'clean':
				        console.log("SELECTED CLEAN...!");

				        break;
			        default:
				        break;
			        }
		        } else {
			        console.log("Could not derive a valid action...! ");
			        console.log("Please match your Gruntfile with the packages documentation...");
		        }
		        // #########
		        var reference_options_switch_object = {
		          action : [ 'switch', 'clean' ],
		          direction : [ 'min', 'regular' ],
		          file_source : [ 'wildcard', 'list' ]
		        };

		        if (global_functions.private_action_checker(this, reference_options_switch_object, false)) {

			        if (this.data.options.action === 'switch') {
				        if (this.data.options.file_source === 'list') {

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

	        }); // End of the major function...
};
