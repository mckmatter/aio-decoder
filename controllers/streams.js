/*
This is the controller for requests made to
  --  /streams --

mckmatter - 2017
*/

//Require Express
var express = require('express')
var router = express.Router()


//Require Model
var Streams = require('../models/Stream')

var User = require('../models/User')

//Require Middleware
var StreamChange = require('../middlewares/streamChange.js')

var sc = function(id, cb) {
	Streams.getUriById(req.params, function(err, result) {
		StreamChange.setStream(result, function(err) {
			if(err){
				cb(err, 500)
			}
			else {
				cb(null, 200)
			}
		})

	})
}

//Route to get Stream Table
router.post('/', function(req, res) {
	console.log('POST /streams')
	console.log(req.body)

	if(!req.body.token){
		console.log('/streams: NO TOKEN')
		res.render('login')
	}
	else {
		User.checkToken(req.body.token, function(err, result) {
			if(err){
				res.render('login')
			}
			else{
				Streams.getAllStreams(function(err, result) {
					res.render('streams', {streams: result})
				})
			}
		})
	}
})


//Route to change stream
router.post('/:id', function(req, res) {

	if(!req.body.token){
		res.render('login')
	}
	else {
		User.checkToken(req.body.token, function(err, result) {
			if(err){
				res.render('login')
			}
			else{
				sc(req.params.id, function(err, status) {
					if(err){
						console.log(err)
						res.sendStatus = status
					}
					else{
						console.log(err)
						res.sendStatus = status
					}
				})
			}
		})
	}
})

module.exports = router;


