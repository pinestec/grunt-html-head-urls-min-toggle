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
	    wildcard_targets_min : {
		    files : [ {
		      expand : true,
		      direction : 'min',
		      cwd : './',
		      src : [ '*.max.html' ]
		    } ]
	    },
	    wildcard_targets_regular : {
		    files : [ {
		      expand : true,
		      direction : 'regular',
		      cwd : './',
		      src : [ '*.max.html' ]
		    } ]
	    },
	    targets : {
	      min_targets : [ './bash_sed_perl.max.html', './current_commented_places.max.html',
	          './git_files__get_prepare.max.html', './index.max.html', './linksys_quick_rebirth.max.html',
	          './loginBasedPrivacyKeyManagement.max.html', './node_js_with_grunt.max.html',
	          './regular_expression_snippets.max.html', './ssh_pearls.max.html', './windows_certificate_related.max.html' ],
	      regular_targets : [ './ctos_np.max.html', './eclipse_related.max.html', './graphicsWorkCurrentMemory.max.html',
	          './jquery_pearls.max.html', './linux.max.html', './mp4todvd.max.html', './quickcmds.max.html',
	          './ssh_key_generation.max.html', './useful_apps_steppingstone.max.html' ],
	    }
	  },
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('default', [ 'jshint', 'html_head_urls_min_toggle' ]);

	grunt.registerTask('wm', 'html_head_urls_min_toggle:wildcard_targets_min');
	grunt.registerTask('wr', 'html_head_urls_min_toggle:wildcard_targets_regular');
	grunt.registerTask('t', 'html_head_urls_min_toggle:targets');
};
