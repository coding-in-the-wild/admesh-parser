var convertStrToObj = require("./admeshStringParser.js")
var cp = require('child_process')

module.exports = function convertAdmesh(admeshDir, options, callback) {
	if (typeof options === "string") options = [options]

	cp.exec(admeshDir+" "+options.join(" "), function (err, stdout) {
		if (err) callback(err)
		else     callback(false, convertStrToObj(stdout))
	})
}