

var fs = require('fs')

var config = {
	hostname: "hub-pi-dmp-01",
	jwtSecret: "aRandomSecret",
	currentStream: 1
}



module.exports.writeCurrentStream = function(pCurrentStream) {

	config.currentStream = pCurrentStream

	var data = JSON.stringify(config)
	console.log(data)

	fs.writeFile('./middlewares/config.json', data, function(err) {
		if(err) {
			console.log(err)
		}
		else {
			console.log("Config Written!")
		}
	})
}