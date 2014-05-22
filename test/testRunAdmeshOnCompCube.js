var admeshDir = 'C:/Program Files (x86)/admesh/admesh.exe'
var Admesh = require('../index.js')
var admesh = new Admesh(admeshDir)
var test = require('tap').test
var safeErrMsg = require('safe-err-msg')
var compCubeDirs =	["./companion-cube.stl", "./companion-cube-2.stl"]


var compareObjects = function(testObj, goodObj, prefixString) {
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


test("run admesh on companion cube 1", function(t) {
	var correctValues_cc = {x:{min:12.825}, y:{min:20.82688}, parts:1,
		volume:0, edges:{backwards:0}, normalsFixed:6}
	
	admesh(compCubeDirs[0], function(err, testObj) {
		t.notOk(err, "error is falsey"+safeErrMsg(err))
		compareObjects(testObj, correctValues_cc, "Companion Cube #1")
		t.end()
	})
})


test("run admesh on companion cube 2", function(t) {	
	var correctValues_cc2 = {x:{min:-21.346926}, y:{min:-25.001492}, parts:7,
		volume:33.482048, edges:{backwards:0}, normalsFixed:16}
	
	admesh(compCubeDirs[1], function(err, testObj) {
		t.notOk(err, "error is falsey"+safeErrMsg(err))
		compareObjects(testObj, correctValues_cc2, "Companion Cube #2")
		t.end()
	})
})