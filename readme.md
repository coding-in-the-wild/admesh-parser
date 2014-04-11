#Admesh Parser

##Table of Contents

+ Info
+ Usage

##Info

This program is designed to take an STL file and return a JavaScript object. The object contains information about the file including:  

+ Dimensions
 - X (Min, Max)
 - Y (Min, Max)
 - Z (Min, Max)
+ Facets, Number of:
 - Overall (Before, After)
 - Disconnected (Before, After)
 - Degenerate
 - Removed
 - Added
 - Reversed
+ 3D Volume (in mm)
+ Number of parts
+ Number of fixed edges
+ Number of backwards edges

##Usage

To use this module, you will need [admesh](https://sites.google.com/a/varlog.com/www/admesh-htm).  

You will also need an STL file to run this on. Two files are included in the 'test' folder.

**Include:**

	var admeshParser = require('admesh-parser')

**Options:**

	var options = [
		"--remove-unconnected",
		"--fill-holes",
		"C:\\Users\\Me\\Documents\\gear.stl"
	] //The last element must be a string of the input file directory

**No options:**  
Well, you still need the input file!  

`options = ["C:\\Users\\Me\\Documents\\gear.stl"]`  
*or*  
`options =  "C:\\Users\\Me\\Documents\\gear.stl"`

The options argument can be either a string, or an array of strings.

**Parse:**

	var gear = admeshParser(
		"C:\\Program Files\\admesh\\admesh.exe", //Admesh dir
		options
	)

**Get Info:**

	console.log("Number of parts: " + gear.parts)
	console.log("Min X: " + gear.x.min)
	console.log("Max X: " + gear.x.max)
	console.log("Num of facets, before: " + gear.facets.overall.before)
	console.log("Volume: " + gear.volume)
	console.log("Admesh version: " + gear.processedByVersion)
	//Etc.
