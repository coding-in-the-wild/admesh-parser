var test = require('tap').test
var parser = require("../admeshStringParser.js")

test("parser returns correct numbers", function(t) {
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
		"Normals fixed         :     12")
	
	test("parser gets correct sizes", function (t) {
		t.equal(obj.x.min, -1.334557)
		t.equal(obj.y.min, -1.377953)
		t.equal(obj.z.min, -1.373225)
		t.equal(obj.x.max,  1.370952)
		t.equal(obj.y.max,  1.377230)
		t.equal(obj.z.max,  1.242838)
		t.end()
	})
	
	test("parser gets correct facet statuses (is that a word?)", function(t) {
		t.equal(obj.facets.overall.before,			3656)
		t.equal(obj.facets.overall.after,			3656)
		t.equal(obj.facets.disconnected1.before,	18)
		t.equal(obj.facets.disconnected1.after,		0)
		t.equal(obj.facets.disconnected2.before,	3)
		t.equal(obj.facets.disconnected2.after,		0)
		t.equal(obj.facets.disconnected3.before,	0)
		t.equal(obj.facets.disconnected3.after,		0)
		t.equal(obj.facets.disconnected .before,	21)
		t.equal(obj.facets.disconnected .after,		0)
		t.end()
	})
	
	test("parser gets correct processing stats", function(t) {
		t.equal(obj.parts,				1)
		t.equal(obj.volume,				10.889216)
		t.equal(obj.facets.degenerate,	4)
		t.equal(obj.edges.fixed,		24)
		t.equal(obj.facets.removed,		14)
		t.equal(obj.facets.added,		3)
		t.equal(obj.facets.reversed,	2)
		t.equal(obj.edges.backwards,	0)
		t.equal(obj.normalsFixed,		12)
		t.end()
	})
	
	t.end()
})