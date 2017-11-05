/*
This is the model for the Streams table

mckmatter - 2017
*/

var sqlite = require('sqlite3').verbose()

var doEach = function(string, cb) {
	var result = [];

	let db = new sqlite.Database('./database/database.db', sqlite.OPEN_READ, (err) => {
		if(err) {
			console.log(err.message)
		}
		console.log("Connected to Database")
	})

	db.serialize(() => {
		db.each(string, (err, row) => {
			if(err) {
				console.log(err.message)
			}
			result.push(row)
		})
	})

	db.close((err) => {
		if(err) {
			console.log(err.message)
		}

		console.log("Closed")
		cb(null, result)
	})
}//END doEach

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

module.exports.getAllStreams = function(cb) {
	var sql = 'SELECT id, title, url FROM Stream'

	doEach(sql, function(err, result) {
		cb(null, result)
	})
}

module.exports.getUriById = function(params, cb) {
	var sql = 'SELECT url FROM Stream ' +
				'WHERE id = ?'

	doGet(sql, params.id, function(err, result) {
		console.log("result: " + result.url)
		cb(null, result[0])
	})
}

