/*
 * grunt-html-head-urls-min-toggle
 * https://github.com/pinestec/grunt-html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	grunt.initConfig({
	  clean : {
		  tests : [ 'tmp' ]
	  },

	  html_head_urls_min_toggle : {
	    to_min : {
	      options : {
	        action : 'switch',
	        direction : 'min',
	        file_source : 'wildcard',
	        chattiness : 'false'
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.html' ]
	      }, {
	        cwd : './',
	        src : [ '*.html' ]
	      } ]
	    },

	    to_regular : {
	      options : {
	        action : 'switch',
	        direction : 'regular',
	        file_source : 'wildcard',
	        chattiness : 'false'
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.html' ]
	      }, {
	        cwd : './',
	        src : [ '*.html' ]
	      } ]
	    },

	    just_clean : {
	      options : {
	        action : 'clean',
	        file_source : 'list',
	        chattiness : 'false'
	      },
	      custom_files : [ 'local_sample_no_one.max.html', 'local_sample_no_two.html' ]
	    }
	  },

	  jshint : {
	    all : [ 'Gruntfile.js', 'tasks/*.js', 'test/*_test.js' ],
	    options : {
	      jshintrc : '.jshintrc',
	      reporterOutput : ""
	    }
	  }

	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');

	grunt.registerTask('default', [ 'jshint', 'html_head_urls_min_toggle' ]);

	grunt.registerTask('c', [ 'clean' ]);
	grunt.registerTask('j', [ 'jshint' ]);

	grunt.registerTask('m', [ 'html_head_urls_min_toggle:to_min' ]);
	grunt.registerTask('r', [ 'html_head_urls_min_toggle:to_regular' ]);
	grunt.registerTask('jc', [ 'html_head_urls_min_toggle:just_clean' ]);
};