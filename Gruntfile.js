/*
 * grunt-html-head-urls-min-toggle
 * https://github.com/pinestec/html-head-urls-min-toggle
 *
 * Copyright (c) 2017 Michael Hartung
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	grunt.initConfig({

	  jshint : {
	    all : [ 'Gruntfile.js', 'tasks/*.js', 'test/*_test.js' ],
	    options : {
	      jshintrc : '.jshintrc',
	      reporterOutput : ""
	    }
	  },

	  clean : {
		  tests : [ 'tmp' ]
	  },

	  html_head_urls_min_toggle : {
	    projectOne_targets : {
	      options : {
	        action : 'switch',
	        direction : 'regular',
	        file_source : 'list'
	      },
	      custom_files : [ './bash_sed_perl.max.html', './current_commented_places.max.html',
	          './git_files__get_prepare.max.html', './index.max.html', './linksys_quick_rebirth.max.html',
	          './loginBasedPrivacyKeyManagement.max.html', './node_js_with_grunt.max.html',
	          './regular_expression_snippets.max.html', './ssh_pearls.max.html', './windows_certificate_related.max.html' ]
	    },
	    projectTwo_targets : {
	      options : {
	        action : 'switch',
	        direction : 'regular',
	        file_source : 'wildcard'
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.html' ]
	      } ]
	    },
	    projectTwo_targets_clean : {
	      options : {
	        action : 'clean',
	        direction : 'regular',
	        file_source : 'wildcard'
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.html' ]
	      } ]
	    }
	  }
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('default', [ 'jshint', 'html_head_urls_min_toggle' ]);

	grunt.registerTask('j', 'jshint');

	grunt.registerTask('wm', 'html_head_urls_min_toggle:projectTwo_targets');
	grunt.registerTask('wr', 'html_head_urls_min_toggle:projectTwo_targets');
	grunt.registerTask('l', 'html_head_urls_min_toggle:projectOne_targets');
	grunt.registerTask('c', 'html_head_urls_min_toggle:projectTwo_targets_clean');
};