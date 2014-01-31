var convertStrToObj = require("./admeshStringParser.js")

module.exports = function(admeshDir, fullFileNameAndDir, callback) {
	var cp = require('child_process')
	var child
	var calledBack = false

	child = cp.exec(admeshDir+"admesh.exe "+fullFileNameAndDir,
		function (error, stdout, stderr) {
			if (error) {
				callback(error)
			} else {
				callback(0, convertStrToObj(stdout))
			}
		}
	)
}