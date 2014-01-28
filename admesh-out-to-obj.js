var str2obj = function (str) {//expects one long string (with or without \n chars)
	var detectedNums = []
	var reFloat = /([\d-][\d\.]*)/g //allows multiple periods. parseFloat() ignores digits after the 2nd period.
	var temp
	while ((temp = reFloat.exec(str)) !== null) {
		detectedNums.push(temp[0])
		//console.log("Found\t" + temp[0] + "\t\tNext match starts at " + reFloat.lastIndex)
	}
	//console.log(detectedNums)
	
	var result = {
		version:{}, x:{}, y:{}, z:{},
		facets:{overall:{}, disconnected:{}, disconnected1:{}, disconnected2:{}, disconnected3:{}},
		edges:{}
	}
	
	result.inputFile = /([A-z]+\.[A-z]{3})/.exec(str)[1]
	
	result.version.produced =  detectedNums[0]
	result.version.processed = detectedNums[1]
	
	result.x.min = parseFloat(detectedNums[2])
	result.x.max = parseFloat(detectedNums[3])
	result.y.min = parseFloat(detectedNums[4])
	result.y.max = parseFloat(detectedNums[5])
	result.z.min = parseFloat(detectedNums[6])
	result.z.max = parseFloat(detectedNums[7])
	
	result.facets.overall.before = parseInt(detectedNums[8])
	result.facets.overall.after  = parseInt(detectedNums[9])
	result.facets.disconnected1.before = parseInt(detectedNums[11]) //ignore 10
	result.facets.disconnected1.after  = parseInt(detectedNums[12])
	result.facets.disconnected2.before = parseInt(detectedNums[14]) //ignore 13
	result.facets.disconnected2.after  = parseInt(detectedNums[15])
	result.facets.disconnected3.before = parseInt(detectedNums[17]) //ignore 16
	result.facets.disconnected3.after  = parseInt(detectedNums[18])
	result.facets.disconnected .before = parseInt(detectedNums[19])
	result.facets.disconnected .after  = parseInt(detectedNums[20])
	result.facets.degenerate =     parseInt(detectedNums[23])
	result.facets.removed =        parseInt(detectedNums[25])
	result.facets.added =          parseInt(detectedNums[26])
	result.facets.reversed =       parseInt(detectedNums[27])
	
	result.volume =          parseFloat(detectedNums[22])
	
	result.parts =           parseInt(detectedNums[21])
	result.edges.fixed =     parseInt(detectedNums[24])
	result.edges.backwards = parseInt(detectedNums[28])
	result.normalsFixed =    parseInt(detectedNums[29])
	
	console.log(result)
}

if (true) { //true->export   false->test
	module.exports = str2obj
} else {
	str2obj(require("./admesh-out-test-string.js"))
}