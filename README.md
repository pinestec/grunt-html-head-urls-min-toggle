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
The "html_head_urls_min_toggle" task switches the "href" and "src" links in the head area of<br>NOT MINIFIED<br>html-files. 

from e.g.:<br>href="css/jquery-ui.css"<br>
           src="javascript/jquery-3.1.0.js"<br>

to:<br>href="css/jquery-ui.min.css"<br>
           src="javascript/jquery-3.1.0.min.js"<br>

and vice versa.

The aim is to be maximum tolerant regarding an incorrect syntax and not to change anything else than the link itself.
Files are only touched in case changes took place.

The generated output can be controlled by the Gruntfiles task option "chattiness_level".<br>
"chattiness_level : 0"<br>or<br>"chattiness_level : 1"<br>can be added accordingly. 

Of course source and destination is identical with such a task.
Due to that a simple custom syntax is used inside the Gruntfile e.g.:
```js
module.exports = function(grunt) {
      grunt.initConfig({
  ...
   html_head_urls_min_toggle : {
      any_proper_name : {
	      options : {
	            action : 'switch',
	            direction : 'regular',
	            file_source : 'wildcard',
	            chattiness_level : 0 or 1 
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
	            file_source : 'list',
	            chattiness_level : 0 or 1
	          },
	          custom_files : ['file_no_one.max.html','file_no_two.max.html','file_no_three.max.html']
	        },
```

The only additional task is to "clean" the line endings of files regaring the current operating system.<br>
Placing "\x0d\x0a" at the end of each line on windows, and "\x0a" on Linux, OS X, Unix, etc. - Nothing else will be changed...:<br>

```js	        
      just_a_nice_name : {
	        options : {
	            action : 'clean',
	            file_source : 'wildcard',
	            chattiness_level : 0 or 1
	          },
	          custom_files : [ {
	            cwd : './',
	            src : [ '*.txt' ]
	          } ]
	        },    

      another_wonderful_name : {
	          options : {
	            action : 'clean',
	            file_source : 'list',
	            chattiness_level : 0 or 1
	          },
	          custom_files : ['file_no_one.txt','file_no_two.html','file_no_three.txt']
	        },
	     }
  ...
       });
};    
```

## Release History
Version 1.0.0 - Should do the above job nicely...<br>
Version 1.0.1 - Documentation related...<br>
Version 1.0.2 - Documentation related...<br>
Version 1.0.3 - Documentation related...<br>
Version 1.0.4 - Documentation related...<br>
Version 1.0.5 - Proper documentation related tests...<br>
Version 1.0.6 - Proper documentation related tests...<br>
Version 1.0.7 - Added some more line breaks... :-)<br>
Version 1.0.8 - And some more text regarding the cleaning option...<br>
Version 1.0.9 - Added some keywords...<br>
Version 1.0.10 - The power of line breaks... :-)<br>
Version 1.0.11 - Highlight "not minified" html targets a bit more... with line breaks... :-)<br>
Version 1.0.12 - Placed stuff at GitHub - without additional line breaks... :-(<br>
Version 1.0.13 - Repaired a typo...<br>
Version 1.0.14 - Corrected the links inside package.json...<br>
Version 1.0.15 - Cleaned up the sample Gruntfile...<br>
Version 1.0.16 - Back to 1.0.15...<br>
Version 1.1.1 - Added a proper options handling and the "chattiness level"...<br>

Michael Hartung
04.August 2017
 
Have Fun! 
