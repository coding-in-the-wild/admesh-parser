admesh-parser
=============

[![Build Status](https://travis-ci.org/ArtskydJ/admesh-parser.svg?branch=master)](https://travis-ci.org/ArtskydJ/admesh-parser)
[![Github Repository](http://img.shields.io/badge/Repository-Github-brightgreen.svg)](https://github.com/ArtskydJ/admesh-parser)

- [Description](#description)
- [You Can't Use This Until You Download More Stuff](#you-cant-use-this-until-you-download-more-stuff)
- [Install](#install)
- [Include](#include)
- [admeshParser(options, cb)](#admeshparseroptions-cb)
- [Example](#example)
- [License](#license)

##Description

This module returns a function that takes an STL file and returns a JavaScript object containing information about the file. 

##You Can't Use This Until You Download More Stuff

To use this module, you will need [admesh](https://sites.google.com/a/varlog.com/www/admesh-htm). This module just parses admesh's output, it does not include admesh. (Well, technically, it does, in the test folder, but it only will work for windows.)

You will also need an STL file to run this on. Two files are included in the 'test' folder.

##Install

	npm install admesh-parser

##Include

	var AdmeshParser = require('admesh-parser')
	var admeshParser = new AdmeshParser('C:\\Users\\Me\\Documents\\admesh.exe') //Admesh Directory (spaces allowed)

##admeshParser(options, cb)

**options** (Array or String)  
The last element must be a string of the input file directory

	var options
	
	options = [
		"--remove-unconnected",
		"--fill-holes",
		"C:\\Users\\Me\\Documents\\gear.stl"
	]
	//or
	options = ["C:\\Users\\Me\\Documents\\gear.stl"]
	//or
	options =  'C:\\Users\\Me\\Documents\\gear.stl'

The options argument can be either a string, or an array of strings.

**cb(err, result)**

	//Result should look something like this:
	{ x: { min: -1.334557, max: 1.370952 },
	  y: { min: -1.377953, max: 1.37723 },
	  z: { min: -1.373225, max: 1.242838 },
	  facets: 
	   { overall: { before: 3656, after: 3656 },
	     disconnected1: { before: 18, after: 0 },
	     disconnected2: { before: 3, after: 0 },
	     disconnected3: { before: 0, after: 0 },
	     disconnected: { before: 21, after: 0 },
	     degenerate: 4,
	     removed: 14,
	     added: 3,
	     reversed: 2 },
	  edges: { fixed: 24, backwards: 0 },
	  volume: 10.889216,
	  parts: 1,
	  normalsFixed: 12 }
    

##Example
	
	var AdmeshParser = require('admesh-parser')
	var admeshParser = new AdmeshParser('C:\\Users\\Me\\Documents\\admesh.exe') //Admesh Directory
	
	var model = admeshParser("C:\\Users\\Me\\Documents\\gear.stl") //Options (model dir)

	console.log("Number of parts: " + model.parts)
	console.log("Min X: " + model.x.min)
	console.log("Max X: " + model.x.max)
	console.log("Num of facets, before: " + model.facets.overall.before)
	console.log("Volume: " + model.volume)

##License

[MIT](http://opensource.org/licenses/MIT)
