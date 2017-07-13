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
		    // Check the entire "this" object and comment out the next line...
		    // grunt.log.write("\n" + JSON.stringify(this) + "\n\n");
		    var spot_nameArgs_RegExp = new RegExp("^html_head_urls_min_toggle\\:[\\w-]*targets?[\\w-]*$", "i");
		    if (this.nameArgs.search(spot_nameArgs_RegExp) !== -1) {
			    var min_targets_array = [];
			    var regular_targets_array = [];
			    var global_functions = {};
			    global_functions = require('./html_head_urls_min_toggle__global_functions.js');

			    if (this.data.files[0].expand) {
				    grunt.log.write("CURRENT DATA: \"" + this.data.files[0].expand + "\"\n");
				    grunt.log.write("CURRENT DATA: \"" + this.data.files[0].direction + "\"\n");
			    } else {
				    grunt.log.write("CURRENT DATA: \"" + this.data.files[0].expand + "\"\n");
			    }

			    if (min_targets_array.length === 1) {
				    grunt.log.write("\nOne file specified to switch all it's \"head links\" to \"minified sources\"...:\n");
			    } else {
				    grunt.log.write("\n" + min_targets_array.length +
				        " Files specified to switch all their \"head links\" to \"minified sources\"...:\n");
			    }
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

			    if (min_targets_array.length > 0) {

				    for (var i = 0; i < min_targets_array.length; i++) {
					    grunt.log.write("\t" + (i + 1) + ": \"" + min_targets_array[i] + "\"");
					    if (global_functions.toggle_all_head_links('min', min_targets_array[i])) {
						    grunt.log.write("\t- o.k.\n");
					    } else {
						    grunt.log.write("\t- >>> Failed...! <<<\n");
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
						    grunt.log.write("\t- o.k.\n");
					    } else {
						    grunt.log.write("\t- >>> Failed...! <<<\n");
					    }
				    }
			    } else {
				    grunt.log
				        .write("\n>>> NO \"HTML Files\" listed to switch their \"head links\" to \"regular sources\"... <<<\n");
			    }
		    } else {
			    // Merge task-specific and/or target-specific options with these
			    // defaults.
			    var options = this.options({
			      punctuation : '.',
			      separator : ', '
			    });
			    // Iterate over all specified file groups.
			    this.files.forEach(function(current_file) {
				    // grunt.log.write("\nDESTINATION: \"" + current_file.dest +
				    // "\"");
				    // grunt.log.write("\nSOURCE: \"" + current_file.src +
				    // "\"\n\n");
				    // Concat specified files.
				    var src = current_file.src.filter(function(filepath) {
					    // Warn on and remove invalid source files (if nonull was
					    // set).
					    if (!grunt.file.exists(filepath)) {
						    grunt.log.warn('Source file "' + filepath + '" not found.');
						    return false;
					    } else {
						    return true;
					    }
				    }).map(function(filepath) {
					    // Read file source.
					    return grunt.file.read(filepath);
				    }).join(grunt.util.normalizelf(options.separator));

				    // Handle options.
				    src += options.punctuation;

				    // Write the destination file.
				    grunt.file.write(current_file.dest, src);

				    // Print a success message.
				    grunt.log.writeln('File "' + current_file.dest + '" created.');
			    });
		    }
	    });
};
