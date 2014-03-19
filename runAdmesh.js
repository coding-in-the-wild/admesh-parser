var convertStrToObj = require("./admeshStringParser.js")

module.exports = function convertAdmesh(admeshDir, options, callback) {
	if (typeof options === "string")
		options = [options]

	require('child_process').exec(admeshDir+" "+options.join(" "),
		function (error, stdout, stderr) {
			if (error) {
				callback(error)
			} else {
				callback(false, convertStrToObj(stdout))
			}
		}
	)
}