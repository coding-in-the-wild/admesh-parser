module.exports = function parser(str) { //expects one long string (with or without \n chars)
	var reFloat = /\s(-?\d[\d\.]*)/g //allows multiple periods. parseFloat() ignores digits after the 2nd period.
	var reFileName = /([\w-]+\.[A-z]{3})/
	var result = {
		x:{}, y:{}, z:{},
		facets:{overall:{}, disconnected1:{}, disconnected2:{}, disconnected3:{}, disconnected:{}},
		edges:{}
	}

	var strArr = str.split("===== Size =====")
	var temp
	var detectedNums = []
	while ((temp = reFloat.exec(strArr[1])) !== null) {
		detectedNums.push(parseFloat(temp[0]))
	}
	
	if (detectedNums.length === 28) {
		result.x.min = detectedNums[0]
		result.x.max = detectedNums[1]
		result.y.min = detectedNums[2]
		result.y.max = detectedNums[3]
		result.z.min = detectedNums[4]
		result.z.max = detectedNums[5]
		
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
		
		result.volume =          detectedNums[20]
		
		result.parts =           parseInt(detectedNums[19])
		result.edges.fixed =     parseInt(detectedNums[22])
		result.edges.backwards = parseInt(detectedNums[26])
		result.normalsFixed =    parseInt(detectedNums[27])
		
		result.all = detectedNums
		
		return result
	} else {
		// THROW ERROR HERE!!!
		return -1
	}	
}
