var convertStrToObj = require("./admeshStringParser.js")

module.exports = function convertAdmesh(admeshDir, options, callback) {
	var cp = require('child_process')
	var child
	var calledBack = false
	
	if (typeof options === "string")
		options = [options]

	child = cp.exec(admeshDir+" "+options.join(" "),
		function (error, stdout, stderr) {
			if (error) {
				callback(error)
			} else {
				callback(0, convertStrToObj(stdout))
			}
		}
	)
}