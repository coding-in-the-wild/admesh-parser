var test = require('tap').test
var parser = require("../parser.js")

test("parser throws error for not enough args", function (t) {
	t.plan(3)
	try {
		var obj = parser( //deleted a few lines...
			"============ Results produced by ADMesh version 0.97.3 ============\n"+
			"Input file         : sphere.stl\n"+
			"File type          : Binary STL file\n"+
			"Header             : Processed by ADMesh version 0.97.3\n"+
			"============== Size ==============\n"+
			"Min X = -1.334557, Max X = 1.370952\n"+
			"Min Y = -1.377953, Max Y = 1.377230\n"+
			"Min Z = -1.373225, Max Z = 1.242838\n"+
			"========= Facet Status ========== Original ============ Final ====\n"+
			"Number of facets                 :  3656                3656\n"+
			"Facets with 1 disconnected edge  :    18                   0\n"+
			"Facets with 2 disconnected edges :     3                   0\n"+
			"Facets with 3 disconnected edges :     0                   0\n"+
			"Total disconnected facets        :    21                   0\n"+
			"=== Processing Statistics ===     ===== Other Statistics =====\n"+
			"Number of parts       :     1        Volume   :  10.889216\n"
		)
	} catch (err) {
		t.equal(typeof err, 'object', "Returned value is an object")
		t.ok(err instanceof Error, "Returned value is an error object")
		t.ok(err.detectedNums, "Incorrect amount of numbers found in string")
	}
	t.end()
})


test("parser throws error for too many args", function (t) {
	t.plan(3)
	try {
		var obj = parser(
			"============ Results produced by ADMesh version 0.97.3 ============\n"+
			"Input file         : sphere.stl\n"+
			"File type          : Binary STL file\n"+
			"Header             : Processed by ADMesh version 0.97.3\n"+
			"============== Size ==============\n"+
			"Min X = -1.334557, Max X = 1.370952\n"+
			"Min Y = -1.377953, Max Y = 1.377230\n"+
			"Min Z = -1.373225, Max Z = 1.242838\n"+
			"========= Facet Status ========== Original ============ Final ====\n"+
			"Number of facets                 :  3656                3656\n"+
			"Facets with 1 disconnected edge  :    18                   0\n"+
			"Facets with 2 disconnected edges :     3                   0\n"+
			"Facets with 3 disconnected edges :     0                   0\n"+
			"Total disconnected facets        :    21                   0\n"+
			"=== Processing Statistics ===     ===== Other Statistics =====\n"+
			"Number of parts       :     1        Volume   :  10.889216\n"+
			"Degenerate facets     :     4\n"+
			"Edges fixed           :    24\n"+
			"Facets removed        :    14\n"+
			"Facets added          :     3\n"+
			"Facets reversed       :     2\n"+
			"Backwards edges       :     0\n"+
			"Normals fixed         :     12\n"+
			"4 8 15 16 23 42" //As of 2013-02-10 I have not seen the show.
		)
	} catch (err) {
		t.equal(typeof err, 'object', "Returned value is an object")
		t.ok(err instanceof Error, "Returned value is an error object")
		t.ok(err.detectedNums, "Incorrect amount of numbers found in string")
	}

	t.end()
})