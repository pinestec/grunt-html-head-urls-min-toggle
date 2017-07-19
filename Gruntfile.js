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
	    any_custom_name_to_switch_listed : {
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
	    any_custom_name_to_switch_wild : {
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
	    any_custom_name_to_clean_wild : {
	      options : {
	        action : 'clean',
	        file_source : 'wildcard'
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.html' ]
	      } ]
	    },
	    any_custom_name_to_clean_listed : {
	      options : {
	        action : 'clean',
	        file_source : 'list'
	      },
	      custom_files : [ './ctos_np.max.html', './eclipse_related.max.html', './graphicsWorkCurrentMemory.max.html',
	          './jquery_pearls.max.html', './linux.max.html', './mp4todvd.max.html', './quickcmds.max.html',
	          './ssh_key_generation.max.html', './useful_apps_steppingstone.max.html' ]
	    },
	    to_min : {
	      options : {
	        action : 'switch',
	        direction : 'min',
	        file_source : 'wildcard'
	      },
	      custom_files : [ {
	        cwd : './',
	        src : [ '*.max.html' ]
	      } ]
	    },
	    to_regular : {
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
	  }
	});

	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.registerTask('default', [ 'jshint', 'html_head_urls_min_toggle' ]);

	grunt.registerTask('j', 'jshint');

	grunt.registerTask('sl', 'html_head_urls_min_toggle:any_custom_name_to_switch_listed');
	grunt.registerTask('sw', 'html_head_urls_min_toggle:any_custom_name_to_switch_wild');
	grunt.registerTask('cl', 'html_head_urls_min_toggle:any_custom_name_to_clean_listed');
	grunt.registerTask('cw', 'html_head_urls_min_toggle:any_custom_name_to_clean_wild');

	grunt.registerTask('m', 'html_head_urls_min_toggle:to_min');
	grunt.registerTask('r', 'html_head_urls_min_toggle:to_regular');

};