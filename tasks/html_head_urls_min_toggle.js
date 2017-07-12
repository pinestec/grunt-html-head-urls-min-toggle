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
		    // Check the entire "this" object or comment out...
		    // grunt.log.write("\n" + JSON.stringify(this) + "\n\n");

		    grunt.log.write("CURRENT NAME ARGS: \"" + this.nameArgs + "\"\n");
		    var spot_nameArgs_RegExp = new RegExp("^html_head_urls_min_toggle\\:[\\w-]*targets?[\\w-]*$", "i");
		    if (this.nameArgs.search(spot_nameArgs_RegExp) !== -1) {
			    if (this.data.min_targets.length > 0 || this.data.regular_targets.length > 0) {
				    var global_functions = require('./html_head_urls_min_toggle__global_functions.js');
			    }
			    if (this.data.min_targets.length > 0) {
				    if (this.data.min_targets.length === 1) {
					    grunt.log.write("\nOne file specified to switch all it's \"head links\" to \"minified sources\"...:\n");
				    } else {
					    grunt.log.write("\n" + this.data.min_targets.length +
					        " Files specified to switch all their \"head links\" to \"minified sources\"...:\n");
				    }
				    for (var i = 0; i < this.data.min_targets.length; i++) {
					    grunt.log.write("\t" + (i + 1) + ": \"" + this.data.min_targets[i] + "\"");
					    if (global_functions.toggle_all_head_links('min', this.data.min_targets[i])) {
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
			    if (this.data.regular_targets.length > 0) {
				    if (this.data.regular_targets.length === 1) {
					    grunt.log.write("One file specified to switch all it's \"head links\" to \"regular sources\"...\n");
				    } else {
					    grunt.log.write(this.data.regular_targets.length +
					        " Files specified to switch all their \"head links\" to \"regular sources\"...\n");
				    }
				    for (var i = 0; i < this.data.regular_targets.length; i++) {
					    grunt.log.write("\t" + (i + 1) + ": \"" + this.data.regular_targets[i] + "\"");
					    if (global_functions.toggle_all_head_links('regular', this.data.regular_targets[i])) {
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
