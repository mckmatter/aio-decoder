/*
This is the controller for requests made to
  --  /streams --

mckmatter - 2017
*/

//Require Express
var express = require('express')
var router = express.Router()

//Require Model
var Streams = require('../models/streams')

//Require Middleware
var StreamChange = require('../middlewares/streamChange.js')

var sc = function(req, res, next) {
	Streams.getUriById(req.params, function(err, result) {
		StreamChange.setStream(result, function(err) {
			if(err){
				req.params.status = 500
				next()
			}
			else {
				req.params.status = 200
				next()
			}
		})

	})
}

//Route to get Stream Table
router.get('/', function(req, res) {
	Streams.getAllStreams(function(err, result) {
		res.render('streams', {streams: result})
	})
})

//Route to change stream
router.post('/:id', [sc], function(req, res) {
	res.sendStatus(req.params.status)
})

module.exports = router;