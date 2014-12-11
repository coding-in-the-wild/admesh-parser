var parser = require('./parser.js')
var cp = require('child_process')

module.exports = function AdmeshParser(admeshDir) {
	admeshDir = admeshDir || 'admesh'
	return function admeshParser(args, cb) {
		if (typeof args === "string")  args = [args]
		Array.isArray(args) ?
			args.unshift(admeshDir) :
			args = [admeshDir]

		cp.exec(args.join(' '), function (err, stdout, stderr) {
			stdout = stdout.toString()
			stderr = stderr.toString()
			err = err || (stderr && new Error(stderr)) || null
			cb(err, err ? null : parser(stdout))
		})
	}
}
