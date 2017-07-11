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
		    // Merge task-specific and/or target-specific options with these
		    // defaults.
		    var options = this.options({
		      punctuation : '.',
		      separator : ', '
		    });

		    // Iterate over all specified file groups.
		    this.files.forEach(function(f) {
			    // Concat specified files.
			    var src = f.src.filter(function(filepath) {
				    // Warn on and remove invalid source files (if nonull was set).
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
			    grunt.file.write(f.dest, src);

			    // Print a success message.
			    grunt.log.writeln('File "' + f.dest + '" created.');
		    });
	    });

};
