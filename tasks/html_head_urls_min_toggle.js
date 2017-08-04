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
		        grunt.log.write("\n");
		        var global_functions = {};
		        global_functions = require('./html_head_urls_min_toggle__global_functions.js');

		        var chattiness_level = global_functions.chat_o_meter(this.data.options, 'chattiness_level');
		        if (chattiness_level > 1) { // cp2 - Chattiness point - extra
			        grunt.log.write("Current chattiness level: \""['green'] + chattiness_level.toString()['green'] +
			            "\"\n"['green']);
		        }
		        if (chattiness_level > 2) { // cp3 - Chattiness point - maximum
			        grunt.log
			            .write("Chattiness level exceeds \"2\" ==> Serializing \"this\" object to \"./etc/this_sample_object.json\"\n"['red']);
			        global_functions.serialize_object_to_disk(this, './etc/this_sample_object.json');
		        }
		        var fileSystem_Module = global_functions.globalModule_Try('fs');
		        var currentFileHandle;
		        var options_reference_object;
		        try {
			        currentFileHandle = fileSystem_Module.openSync(
			            './node_modules/grunt-html-head-urls-min-toggle/etc/global_options.json', 'r');
			        if (chattiness_level > 1) { // cp2 - Chattiness point - extra
				        grunt.log.write("Got filehandle to reference options successfully..."['green']);
			        }
		        } catch (current_exception) {
			        if (chattiness_level > 1) { // cp2 - Chattiness point - extra
				        console.log("Just catched...: \""['red'] + current_exception.toString()['red'] + "\""['red']);
			        }
		        }
		        if (currentFileHandle === undefined) {
			        try {
				        currentFileHandle = fileSystem_Module.openSync('./etc/global_options.json', 'r');
				        if (chattiness_level > 1) { // cp2 - Chattiness point - extra
					        grunt.log
					            .write("Got filehandle to reference options on development environment successfully...\n"['green']);
				        }
			        } catch (current_exception) {
				        if (chattiness_level > 1) { // cp2 - Chattiness point - extra
					        console.log("Just catched...: \""['red'] + current_exception.toString()['red'] + "\""['red']);
				        }
			        }
		        }
		        if (currentFileHandle !== undefined) {
			        if (chattiness_level > 1) { // cp2 - Chattiness point - extra
				        grunt.log.write("Valid file handle found... Loading reference options...\n"['green']);
			        }
			        options_reference_object = JSON.parse(fileSystem_Module.readFileSync(currentFileHandle));
			        fileSystem_Module.closeSync(currentFileHandle);
		        } else {
			        if (chattiness_level > 1) { // cp2 - Chattiness point - extra
				        grunt.log.write("Invalid file handle...! Loading in-house reference options..."['red']);
			        }
			        options_reference_object = {
			          action : [ 'switch', 'clean' ],
			          chattiness_level : [ 1, 2, 3 ],
			          direction : [ 'min', 'regular' ],
			          file_source : [ 'wildcard', 'list' ]
			        };
		        }
		        var action__current_value = global_functions.casual__options_property_servant(this.data.options,
		            options_reference_object, 'action');
		        if (action__current_value) {
			        var global_counter = 0;
			        switch (action__current_value) {
			        case 'switch':
				        var file_source = global_functions.casual__options_property_servant(this.data.options,
				            options_reference_object, 'file_source');
				        if (file_source === 'list') {
					        for (var il = 0; il < this.data.custom_files.length; il++) {
						        if (chattiness_level === 1) { // cp1 - Chattiness point -
							        // regular
							        grunt.log.write("\t" + (il + 1) + ": \"" + this.data.custom_files[il] + "\"");
						        }
						        if (global_functions.toggle_all_head_links(this.data.options.direction, this.data.custom_files[il])) {
							        if (chattiness_level === 1) { // cp1 - Chattiness point -
								        // regular
								        grunt.log.write("\t- to \""['green'] + this.data.options.direction['green'] + "\" o.k."['green'] +
								            "\n");
							        }
							        global_counter++;
						        } else { // cpn - Chattiness point - nonmaskable
							        grunt.log.write("\t" + (il + 1) + ": \"" + this.data.custom_files[il] + "\"");
							        grunt.log.write("\t- to \""['red'] + this.data.options.direction['red'] +
							            "\">>> Failed...! <<<"['red'] + "\n");
						        }
					        }
					        // cp0 - Chattiness point - minimal:
					        if (global_counter > 0 && chattiness_level === 0) {
						        if (global_counter === 1) {
							        grunt.log
							            .write("Switched \""['green'] + global_counter.toString()['green'] + "\" file to \""['green'] +
							                this.data.options.direction['green'] + "\" successfully...\n"['green']);
						        } else {
							        grunt.log.write("Switched \""['green'] + global_counter.toString()['green'] +
							            "\" files to \""['green'] + this.data.options.direction['green'] +
							            "\" successfully...\n"['green']);
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
								        // cp1 - Chattiness point - regular:
								        if (chattiness_level === 1) {
									        grunt.log.write("\t" + (iw + 1) + ": \"" + inner_files_array[iw] + "\"");
								        }
								        if (global_functions.toggle_all_head_links(this.data.options.direction, inner_files_array[iw])) {
									        // cp1 - Chattiness point - regular
									        if (chattiness_level === 1) {
										        grunt.log.write("\t- to \""['green'] + this.data.options.direction['green'] +
										            "\" o.k."['green'] + "\n");
									        }
									        global_counter++;
								        } else {
									        // cpn - Chattiness point - nonmaskable
									        grunt.log.write("\t" + (iw + 1) + ": \"" + inner_files_array[iw] + "\"");
									        grunt.log.write("\t- to \""['red'] + this.data.options.direction['red'] +
									            "\">>> Failed...! <<<"['red'] + "\n");
								        }
							        }
							        // Just separating the wildcard array items...:
							        console.log("");
							        // cp0 - Chattiness point - minimal:
							        if (global_counter > 0 && chattiness_level === 0) {
								        if (global_counter === 1) {
									        grunt.log.write("Switched \""['green'] + global_counter.toString()['green'] +
									            "\" file to \""['green'] + this.data.options.direction['green'] +
									            "\" successfully...\n"['green']);
								        } else {
									        grunt.log.write("Switched \""['green'] + global_counter.toString()['green'] +
									            "\" files to \""['green'] + this.data.options.direction['green'] +
									            "\" successfully...\n"['green']);
								        }
								        global_counter = 0;
							        }
						        } else { // cpn - Chattiness point - nonmaskable
							        console.log("Missing needed \"wildcard\" file properties...! Please readjust your Gruntfile...");
							        break;
						        }
					        }
					        break;
				        }
				        break;
			        case 'clean':
				        var file_source_clean = global_functions.casual__options_property_servant(this.data.options,
				            options_reference_object, 'file_source');
				        if (file_source_clean === 'list') {
					        for (var ilc = 0; ilc < this.data.custom_files.length; ilc++) {
						        if (chattiness_level > 0) {
							        grunt.log.write("\t" + (ilc + 1) + ": \"" + this.data.custom_files[ilc] + "\"");
						        }
						        if (global_functions.end_of_line_refresh(this.data.custom_files[ilc])) {
							        if (chattiness_level > 0) {
								        grunt.log.write("\t- action \""['green'] + this.data.options.action['green'] + "\" o.k."['green'] +
								            "\n");
							        }
							        global_counter++;
						        } else {
							        grunt.log.write("\t" + (ilc + 1) + ": \"" + this.data.custom_files[ilc] + "\"");
							        grunt.log.write("\t- action \""['red'] + this.data.options.action['red'] +
							            "\" >>> Failed...! <<<"['red'] + "\n");
						        }
					        }
					        if (global_counter > 0) {
						        if (global_counter === 1) {
							        grunt.log.write("Cleaned \""['green'] + global_counter.toString()['green'] +
							            "\" file successfully...\n"['green']);
						        } else {
							        grunt.log.write("Cleaned \""['green'] + global_counter.toString()['green'] +
							            "\" files successfully...\n"['green']);
						        }
					        }
					        break;
				        }
				        if (file_source_clean === 'wildcard') {
					        for (var owc = 0; owc < this.data.custom_files.length; owc++) {
						        if (this.data.custom_files[owc].hasOwnProperty('cwd') &&
						            this.data.custom_files[owc].hasOwnProperty('src')) {
							        var current_files_array = global_functions.process_wildcard_input(this.data.custom_files[owc].src,
							            this.data.custom_files[owc].cwd);
							        for (var iwc = 0; iwc < current_files_array.length; iwc++) {
								        if (chattiness_level > 0) {
									        grunt.log.write("\t" + (iwc + 1) + ": \"" + current_files_array[iwc] + "\"");
								        }
								        if (global_functions.end_of_line_refresh(current_files_array[iwc])) {
									        if (chattiness_level > 0) {
										        grunt.log.write("\t- action \""['green'] + this.data.options.action['green'] +
										            "\" o.k."['green'] + "\n");
									        }
									        global_counter++;
								        } else {
									        grunt.log.write("\t" + (iwc + 1) + ": \"" + current_files_array[iwc] + "\"");
									        grunt.log.write("\t- action \""['red'] + this.data.options.action['red'] +
									            "\" >>> Failed...! <<<"['red'] + "\n");
								        }
							        }
							        if (global_counter > 0) {
								        if (global_counter === 1) {
									        grunt.log.write("Cleaned \""['green'] + global_counter.toString()['green'] +
									            "\" file successfully...\n"['green']);
								        } else {
									        grunt.log.write("Cleaned \""['green'] + global_counter.toString()['green'] +
									            "\" files successfully...\n"['green']);
								        }
								        global_counter = 0;
							        }
						        } else {
							        console.log("MISSING NEEDED \"WILDCARD\" FILE PROPERTIES...!");
						        }
					        }
					        break;
				        }
				        break;
			        default:
				        console.log("REACHED THE DEFAULT BRANCH OF THE SWITCH UNEXPECTEDLY...!");
				        break;
			        }
		        } else {
			        console.log("Could not derive a valid action...! ");
			        console.log("Please match your Gruntfile with the packages documentation...");
		        }
	        });
};
