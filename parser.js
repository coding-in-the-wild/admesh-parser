module.exports = function parser(str) { //expects one long string (with or without \n chars)
	var reFloat = /\s(-?\d[\d\.]*)/g //allows multiple periods. parseFloat() ignores digits after the 2nd period.
	var reFileName = /([\w-]+\.[A-z]{3})/
	var result = {}

	var strArr = str.split("===== Size =====")
	if (strArr.length === 2) {
		var temp
		var detectedNums = []
		while ((temp = reFloat.exec(strArr[1])) !== null) {
			detectedNums.push(parseFloat(temp[0]))
		}
	}
	
	if (detectedNums.length === 28 && strArr.length === 2) {
		result.x = {
			min: detectedNums[0],
			max: detectedNums[1]
		}
		result.y = {
			min: detectedNums[2],
			max: detectedNums[3]
		}
		result.z = {
			min: detectedNums[4],
			max: detectedNums[5]
		}
		
		result.facets = {
			overall: {
				before: parseInt(detectedNums[6]),
				after: parseInt(detectedNums[7])
			},
			disconnected1: {
				before: parseInt(detectedNums[9]), //ignore 8
				after: parseInt(detectedNums[10])
			},
			disconnected2: {
				before: parseInt(detectedNums[12]), //ignore 11
				after: parseInt(detectedNums[13])
			},
			disconnected3: {
				before: parseInt(detectedNums[15]), //ignore 14
				after: parseInt(detectedNums[16])
			},
			disconnected: {
				before: parseInt(detectedNums[17]),
				after: parseInt(detectedNums[18])
			},
			degenerate: parseInt(detectedNums[21]),
			removed: parseInt(detectedNums[23]),
			added: parseInt(detectedNums[24]),
			reversed: parseInt(detectedNums[25])
		}
		result.volume = detectedNums[20]
		
		result.parts = parseInt(detectedNums[19])
		result.edges = {
			fixed: parseInt(detectedNums[22]),
			backwards: parseInt(detectedNums[26])
		}
		result.normalsFixed = parseInt(detectedNums[27])
		
		return result
	} else {
		var err = new Error("Unparseable string: "+strArr.length+", "+detectedNums.length)
		err.detectedNums = detectedNums.length
		return err
	}	
}
