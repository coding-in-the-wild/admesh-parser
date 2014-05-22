var convertStrToObj = require("./admeshStringParser.js")
var cp = require('child_process')


module.exports = function AdmeshParser(admeshDir) {
	function admeshParser(options, cb) {
		if (typeof options === "string") options = [options]

		cp.exec(admeshDir+" "+options.join(" "), function (err, stdout) {
			cb(err, convertStrToObj(stdout))
		})
	}
}