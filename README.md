# grunt-html-head-urls-min-toggle

> Point the html-head href and src urls to minified sources and vice versa.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-html-head-urls-min-toggle --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-html-head-urls-min-toggle');
```

## The "html_head_urls_min_toggle" task

### Introduction
Hello Michael...!
The "html_head_urls_min_toggle" task switches the "href" and "src" links in the head area of NOT MINIFIED html-files. 

from e.g.: href="css/jquery-ui.css"
           src="javascript/jquery-3.1.0.js"

to:        href="css/jquery-ui.min.css"
           src="javascript/jquery-3.1.0.min.js"

and vice versa.

The aim is to be maximum tolerant regarding an incorrect syntax and not to change anything else than the link itself.
Files are only touched in case changes took place.

Of course source and destination is identical with such a task.
Due to that a simple custom syntax is used inside the Gruntfile e.g.:

module.exports = function(grunt) {
      grunt.initConfig({
 
   html_head_urls_min_toggle : {
      any_proper_name : {
	      options : {
	            action : 'switch',
	            direction : 'regular',
	            file_source : 'wildcard'
	          },
	          custom_files : [
	              {
	                cwd : './',
	                src : [ '*.max.html' ]
	              },
	              {
	                cwd : '../',
	                src : [ '*.big.html' ]
	              } ]
	        },
	        
      another_proper_name : {
	          options : {
	            action : 'switch',
	            direction : 'min',
	            file_source : 'list'
	          },
	          custom_files : ['file_no_one.max.html','file_no_two.max.html','file_no_three.max.html']
	        },

      // The only additional task is to "clean" the line endings of files regaring the current operating system.
      // "\x0d\x0a" on windows, and "\x0a" on Linux, OS X, Unix, etc.:
	        
      just_a_nice_name : {
	        options : {
	            action : 'clean',
	            file_source : 'wildcard'
	          },
	          custom_files : [ {
	            cwd : './',
	            src : [ '*.txt' ]
	          } ]
	        },    

      another_wonderful_name : {
	          options : {
	            action : 'clean',
	            file_source : 'list'
	          },
	          custom_files : ['file_no_one.txt','file_no_two.html','file_no_three.txt']
	        },
	     }
  
       });
};    


## Release History
Version 1.0.0 - Should do the above job nicely...

Michael Hartung
20.July 2017
 
Have Fun! 
