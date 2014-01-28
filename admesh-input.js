var convert = require('admesh-out-to-obj.js')
var exec = require('child_process').exec,
    child;

var resultObj = {}

child = exec("echo what's up", //change this to "admesh [options] file.stl"
	function (error, stdout, stderr) {
		if (error !== null) {
			console.log('exec error: ' + error);
		} else {
			resultObj = convert(stdout)
		}
});

module.exports = resultObj