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
			stderr = stderr.toString()
			if (err || stderr) return cb(err || new Error(stderr))
			try {
				var result = parser(stdout.toString())
				return cb(null, result)
			} catch (err) {
				cb(err)
			}
		})
	}
}
