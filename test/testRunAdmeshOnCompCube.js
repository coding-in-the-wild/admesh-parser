if (process.platform==='win32') {
	var admeshDir = 'admesh.exe'
	var Admesh = require('../index.js')
	var admesh = new Admesh(admeshDir)
	var test = require('tap').test

	var compCubeData =	{
		"./companion-cube.stl": {
			x: {min: 12.825},
			y: {min: 20.82688},
			parts: 1,
			volume: 0,
			edges: {backwards: 0},
			normalsFixed: 6
		},
		"./companion-cube-2.stl": {
			x: {min: -21.346926},
			y: {min: -25.001492},
			parts: 7,
			volume: 33.482048,
			edges: {backwards: 0},
			normalsFixed: 16
		}
	}


	function compareObjects(testObj, goodObj, prefixString) {
		test("SIZES for "+(prefixString||"this stl file")+" match", function(t) {
			t.equal(testObj.x.min, goodObj.x.min)
			t.equal(testObj.y.min, goodObj.y.min)
			t.end()
		})
		
		test("MORE NUMBERS "+(prefixString||"this stl file")+" match", function(t) {
			t.equal(testObj.parts,				goodObj.parts)
			t.equal(testObj.volume,				goodObj.volume)
			t.equal(testObj.edges.backwards,	goodObj.edges.backwards)
			t.equal(testObj.normalsFixed,		goodObj.normalsFixed)
			t.end()
		})
	}


	test("run admesh on companion cubes", function(t) {
		var x = 0
		Object.keys(compCubeData).forEach(function (dir) {
			var correctValues = compCubeData[dir]
			
			admesh(dir, function (err, testObj) {
				t.notOk(err, "error is falsey"+(err && err.message))
				compareObjects(testObj, correctValues, "Companion Cube #1")
				if (x++) t.end()
			})
		})
	})
}
