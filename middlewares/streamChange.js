/*
This is the middleware for changing the 
stream that OMX is decoding

*/


var cp = require('child_process')
//var { spawnSync } = require('child_process').spawnSync()

module.exports.setStream = function(param, cb) {

	var args1 = []
	args1.push("omxplayer")
	cp.spawnSync("pkill", args1)
	console.log("pkill")

	var args = []
	args.push("--nodeinterlace")
	args.push(param)

	cp.spawn("omxplayer", args)
	console.log("omxplayer")

	cb(null)

}
