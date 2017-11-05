/*
This is the database and authentication middleware

mckmatter - 2017
*/

var sqlite = require('sqlite3').verbose()
var jwt = require('jsonwebtoken')
var secret = "Ehqh5ZVkMeDQY2bw"
var bcrypt = require('bcrypt')

//Get 1 Record from database
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

	var sql = 'SELECT hash ' +
				'FROM User ' +
				'WHERE username = ? '

	doGet(sql, [username], function(err, result) {
		console.log(result)
		if(err) {
			cb(500, null)
		}
		else if(!result){
			cb(401, null)
		}
		else {
			console.log("HASH: " + result.hash)
			bcrypt.compare(password, result.hash, function(err, res) {
				if(res===true) {
					jwt.sign({
						exp: Math.floor(Date.now() / 1000) + (60 * 60),
						user: username
					}, secret, function(err, token) {
						cb(null, token)
					})	
				}
				else {
					cb(401, null)
				}
			})
		}
	})
}

module.exports.checkToken = function(token, cb) {

	jwt.verify(token, secret, function(err, decoded) {
		if(err) {
			console.log("Bad Token")
			cb(403, null)
		}
		else {
			console.log(decoded)
			cb(null, decoded)
		}
	})	
}






