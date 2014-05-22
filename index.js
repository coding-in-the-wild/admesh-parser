var parser = require("./parser.js")
var cp = require('child_process')


module.exports = function AdmeshParser(admeshDir) {
	return function admeshParser(options, cb) {
		if (typeof options === "string") options = [options]

		cp.exec(admeshDir+" "+options.join(" "), function (err, stdout) {
			cb(err, parser(stdout))
		})
	}
}