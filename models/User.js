/*
This is the database and authentication middleware

mckmatter - 2017
*/

var sqlite = require('sqlite3').verbose()

var doGet = function(string, params, callback) {

	var result;

	let db = new sqlite.Database('./database/database.db', sqlite.OPEN_READ, function(err) {
		if(err) {
			console.log(err.message)
		}
	})

	db.get(string, params, function(err, row) {
		if(err) {
			return console.error(err.message)
		}
		result = row
	})

	db.close(function(err) {
		if(err) {
			console.log(err.message)
			callback(err, 0)
		}
		callback(null, result)
	})
}//END doGet


module.exports.authenticate = function(body, cb) {
	var username = body.user
	var password = body.password

	var sql = 'SELECT token ' +
				'FROM User ' +
				'WHERE username = ? ' +
				'AND password = ?'

	doGet(sql, [username, password], function(err, result) {
		console.log("User.authenticate token: " + result.token)
		cb(err, result.token)
	})
}

module.exports.checkToken = function(token, cb) {
	var sql = 'SELECT username ' +
				'FROM User ' +
				'WHERE token = ?'

	doGet(sql, token, function(err, result) {
		if(err) {
			cb(err, null)
		}
		else{
			cb(null, result)
		}
	})
}


