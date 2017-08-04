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
	        chattiness_level : 0
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.html' ]
	      }, {
	        cwd : './',
	        src : [ '*.html' ]
	      } ]
	    },

	    to_min_list : {
	      options : {
	        action : 'switch',
	        direction : 'min',
	        file_source : 'list',
	        chattiness_level : 1
	      },
	      custom_files : [ 'local_sample_no_one.max.html', 'local_sample_no_two.html' ]
	    },

	    to_regular : {
	      options : {
	        action : 'switch',
	        direction : 'regular',
	        file_source : 'wildcard',
	        chattiness_level : 0
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.html' ]
	      }, {
	        cwd : './',
	        src : [ '*.html' ]
	      } ]
	    },

	    to_regular_list : {
	      options : {
	        action : 'switch',
	        direction : 'regular',
	        file_source : 'list',
	        chattiness_level : 3
	      },
	      custom_files : [ 'local_sample_no_one.max.html', 'local_sample_no_two.html' ]
	    },

	    just_clean : {
	      options : {
	        action : 'clean',
	        file_source : 'wildcard',
	        chattiness_level : 1
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.htm' ]
	      }, {
	        cwd : './',
	        src : [ '*.htm' ]
	      } ]
	    },

	    just_clean_list : {
	      options : {
	        action : 'clean',
	        file_source : 'list',
	        chattiness_level : 0
	      },
	      custom_files : [ 'local_sample_no_one.max.html', 'local_sample_no_two.html' ]
	    }
	  },

	  jshint : {
	    all : [ 'Gruntfile.js', 'tasks/*.js', 'test/*_test.js', 'bin/*.js' ],
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

	grunt.registerTask('mw', [ 'html_head_urls_min_toggle:to_min' ]);
	grunt.registerTask('ml', [ 'html_head_urls_min_toggle:to_min_list' ]);
	grunt.registerTask('rw', [ 'html_head_urls_min_toggle:to_regular' ]);
	grunt.registerTask('rl', [ 'html_head_urls_min_toggle:to_regular_list' ]);
	grunt.registerTask('cw', [ 'html_head_urls_min_toggle:just_clean' ]);
	grunt.registerTask('cl', [ 'html_head_urls_min_toggle:just_clean_list' ]);
};