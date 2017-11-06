var fs = require('fs')

var StreamChange = require('./middlewares/streamChange.js')

var Streams = require('./models/Stream')

var streamID = 1;

fs.readFile('./middlewares/config.json', function(err, data) {
	//console.log(data)
	obj = JSON.parse(data)

	Streams.getUriById(obj.currentStream, function(err, result) {
		StreamChange.setStream(result, function(err) {
			if(err) {
				console.log(err)
			}
			else {
				console.log("autoRun Success!")
			}
		})
	})

})

