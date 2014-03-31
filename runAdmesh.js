var convertStrToObj = require("./admeshStringParser.js")

module.exports = function convertAdmesh(admeshDir, options, callback) {
	if (typeof options === "string")
		options = [options]
	
	if (!admeshDir)
		admeshDir = 'C:/Github/admesh-parser/admesh.exe'
	
	require('child_process').exec(admeshDir+" "+options.join(" "), function (err, stdout, stderr) {
		callback(err, convertStrToObj(stdout))
	})
}