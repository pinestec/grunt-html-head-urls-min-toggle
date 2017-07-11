/*
 * grunt-html-head-urls-min-toggle
 * https://github.com/pinestec/html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	  jshint : {
	    all : [ 'Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>' ],
	    options : {
	      jshintrc : '.jshintrc',
	      reporterOutput : ""
	    }
	  },

	  // Before generating any new files, remove any previously-created files.
	  clean : {
		  tests : [ 'tmp' ]
	  },

	  // Configuration to be run (and then tested).
	  html_head_urls_min_toggle : {
	    default_options : {
	      options : {},
	      files : {
		      'tmp/default_options' : [ 'test/fixtures/testing', 'test/fixtures/123' ]
	      }
	    },
	    custom_options : {
	      options : {
	        separator : ': ',
	        punctuation : ' !!!'
	      },
	      files : {
		      'tmp/custom_options' : [ 'test/fixtures/testing', 'test/fixtures/123' ]
	      }
	    },
	    targets : {
	      min_targets : {},
	      regular_targets : {},
	    }
	  },

	  // Unit tests.
	  nodeunit : {
		  tests : [ 'test/*_test.js' ]
	  }

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', [ 'clean', 'html_head_urls_min_toggle', 'nodeunit' ]);

	// By default, lint and run all tests.
	grunt.registerTask('default', [ 'jshint', 'test' ]);
	grunt.registerTask('dt', 'html_head_urls_min_toggle');

};
