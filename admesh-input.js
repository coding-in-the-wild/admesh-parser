var convertStrToObj = function (str) {//expects one long string (with or without \n chars)
	var reFloat = /(\s-?\d[\d\.]*)/g //allows multiple periods. parseFloat() ignores digits after the 2nd period.
	var reFileName = /([\w-]+\.[A-z]{3})/
	var result = {
		version:{}, x:{}, y:{}, z:{},
		facets:{overall:{}, disconnected1:{}, disconnected2:{}, disconnected3:{}, disconnected:{}},
		edges:{}
	}


	var strArr = str.split("===== Size =====")
	//console.log(strArr[0]+"\n\n\n\n"+strArr[1])
	
	var temp
	var detectedNums = []
	while ((temp = reFloat.exec(strArr[1])) !== null) {
		detectedNums.push(temp[0])
		//console.log("Found\t" + temp[0] + "\t\tNext match starts at " + reFloat.lastIndex)
	}
	//console.log("\n\n\n"+detectedNums+"\n\n\n")
	
	result.inputFile = reFileName.exec(strArr[0])[1]
	
	result.version.processed = reFloat.exec(strArr[0])[1]
	
	result.x.min = parseFloat(detectedNums[0])
	result.x.max = parseFloat(detectedNums[1])
	result.y.min = parseFloat(detectedNums[2])
	result.y.max = parseFloat(detectedNums[3])
	result.z.min = parseFloat(detectedNums[4])
	result.z.max = parseFloat(detectedNums[5])
	
	result.facets.overall.before = parseInt(detectedNums[6])
	result.facets.overall.after  = parseInt(detectedNums[7])
	result.facets.disconnected1.before = parseInt(detectedNums[9]) //ignore 8
	result.facets.disconnected1.after  = parseInt(detectedNums[10])
	result.facets.disconnected2.before = parseInt(detectedNums[12]) //ignore 11
	result.facets.disconnected2.after  = parseInt(detectedNums[13])
	result.facets.disconnected3.before = parseInt(detectedNums[15]) //ignore 14
	result.facets.disconnected3.after  = parseInt(detectedNums[16])
	result.facets.disconnected .before = parseInt(detectedNums[17])
	result.facets.disconnected .after  = parseInt(detectedNums[18])
	result.facets.degenerate =     parseInt(detectedNums[21])
	result.facets.removed =        parseInt(detectedNums[23])
	result.facets.added =          parseInt(detectedNums[24])
	result.facets.reversed =       parseInt(detectedNums[25])
	
	result.volume =          parseFloat(detectedNums[20])
	
	result.parts =           parseInt(detectedNums[19])
	result.edges.fixed =     parseInt(detectedNums[22])
	result.edges.backwards = parseInt(detectedNums[26])
	result.normalsFixed =    parseInt(detectedNums[27])
	
	//console.log(result)
	return result
}


var runAdmeshAndGiveResults = function(admeshDir, fullFileName) {
	var cp = require('child_process')
	var child, child2
	var theVariable = 0
	var calledBack = false

	child = cp.exec("cd "+admeshDir,
		function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec 1 error: ' + error);
				calledBack = true;
			} else {
				child2 = cp.exec("admesh.exe"+" "+fullFileName,
					function (error, stdout, stderr) {
						calledBack = true;
						if (error !== null) {
							console.log('exec 2 error: ' + error);
						} else {
							theVariable = convertStrToObj(stdout)
							console.log(theVariable)
							//console.log("\n\n\n"+stdout+"\n\n\n")
						}
					}
				)
			}
			
		/*child2.on('message', function(m) {
			console.log('CHILD2 got message:', m);
		});*/
			
		}
	)
	/*child.on('message', function(m) {
		console.log('CHILD got message:', m);
	});*/
	return theVariable
}


if (false) { //true->normal   false->test
	module.exports = runAdmeshAndGiveResults
} else if (false) {
	console.log(convertStrToObj(require("./admesh-out-test-string.js")))
} else {
	console.log("official:\n"+runAdmeshAndGiveResults("C:\\Github\\admesh-to-js-obj\\","companion-cube-2.stl")+"\n\nunofficial:")
}


/*
Status:
Kind of working...

Bugs:
none, besides being asynchronous
*/