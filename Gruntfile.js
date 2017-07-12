// './bash_sed_perl.max.html', './ctos_np.max.html', './current_commented_places.max.html', './eclipse_related.max.html', './git_files__get_prepare.max.html', './graphicsWorkCurrentMemory.max.html', './index.max.html', './jquery_pearls.max.html', './linksys_quick_rebirth.max.html', './linux.max.html', './loginBasedPrivacyKeyManagement.max.html', './mp4todvd.max.html', './node_js_with_grunt.max.html', './quickcmds.max.html', './regular_expression_snippets.max.html', './ssh_key_generation.max.html', './ssh_pearls.max.html', './useful_apps_steppingstone.max.html', './windows_certificate_related.max.html'

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
	      min_targets : [ './bash_sed_perl.max.html', './current_commented_places.max.html',
	          './git_files__get_prepare.max.html', './index.max.html', './linksys_quick_rebirth.max.html',
	          './loginBasedPrivacyKeyManagement.max.html', './node_js_with_grunt.max.html',
	          './regular_expression_snippets.max.html', './ssh_pearls.max.html', './windows_certificate_related.max.html' ],
	      regular_targets : [ './ctos_np.max.html', './eclipse_related.max.html', './graphicsWorkCurrentMemory.max.html',
	          './jquery_pearls.max.html', './linux.max.html', './mp4todvd.max.html', './quickcmds.max.html',
	          './ssh_key_generation.max.html', './useful_apps_steppingstone.max.html' ],
	    },
	    before_TARGETS_behind : {
	      min_targets : [ './bash_sed_perl.max.html', './current_commented_places.max.html',
	          './git_files__get_prepare.max.html', './index.max.html', './linksys_quick_rebirth.max.html',
	          './loginBasedPrivacyKeyManagement.max.html', './node_js_with_grunt.max.html',
	          './regular_expression_snippets.max.html', './ssh_pearls.max.html', './windows_certificate_related.max.html' ],
	      regular_targets : [ './ctos_np.max.html', './eclipse_related.max.html', './graphicsWorkCurrentMemory.max.html',
	          './jquery_pearls.max.html', './linux.max.html', './mp4todvd.max.html', './quickcmds.max.html',
	          './ssh_key_generation.max.html', './useful_apps_steppingstone.max.html' ],
	    },
	    targets_to_minified_files : {
		    min_targets : [ './bash_sed_perl.max.html', './ctos_np.max.html', './current_commented_places.max.html',
		        './eclipse_related.max.html', './git_files__get_prepare.max.html', './graphicsWorkCurrentMemory.max.html',
		        './index.max.html', './jquery_pearls.max.html', './linksys_quick_rebirth.max.html', './linux.max.html',
		        './loginBasedPrivacyKeyManagement.max.html', './mp4todvd.max.html', './node_js_with_grunt.max.html',
		        './quickcmds.max.html', './regular_expression_snippets.max.html', './ssh_key_generation.max.html',
		        './ssh_pearls.max.html', './useful_apps_steppingstone.max.html', './windows_certificate_related.max.html' ]
	    },
	    targets_to_regular_files : {
		    regular_targets : [ './bash_sed_perl.max.html', './ctos_np.max.html', './current_commented_places.max.html',
		        './eclipse_related.max.html', './git_files__get_prepare.max.html', './graphicsWorkCurrentMemory.max.html',
		        './index.max.html', './jquery_pearls.max.html', './linksys_quick_rebirth.max.html', './linux.max.html',
		        './loginBasedPrivacyKeyManagement.max.html', './mp4todvd.max.html', './node_js_with_grunt.max.html',
		        './quickcmds.max.html', './regular_expression_snippets.max.html', './ssh_key_generation.max.html',
		        './ssh_pearls.max.html', './useful_apps_steppingstone.max.html', './windows_certificate_related.max.html' ]
	    },
	    targets_to_no_files : {},
	    no_files_targets : {}
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

	grunt.registerTask('dt', 'html_head_urls_min_toggle:targets');
	grunt.registerTask('m', 'html_head_urls_min_toggle:targets_to_minified_files');
	grunt.registerTask('r', 'html_head_urls_min_toggle:targets_to_regular_files');
	grunt.registerTask('e', 'html_head_urls_min_toggle:targets_to_no_files');
	grunt.registerTask('n', 'html_head_urls_min_toggle:no_files_targets');
	grunt.registerTask('x', 'html_head_urls_min_toggle:before_TARGETS_behind');

};
