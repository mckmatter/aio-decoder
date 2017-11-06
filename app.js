/*
This is the entry point for the Node application.

This is the file that should be started on login
by the Raspberry Pi. 

mckmatter - 2017
*/

//Require Frameworks and expose Express

var cp = require('child_process')

var express = require('express')
var mustache = require('mustache-express')
var app = express()
var bodyParser = require('body-parser')

//Set the View Engine and pass templates directory
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

//Send req through static, passport middleware
app.use(express.static('public'))

app.use(bodyParser.json())


//Setup All Other Routes
app.use(require('./controllers'))


//Start Server
var port = 3000
app.listen(port, function() {
	console.log('App listening at: ' + port)

	var args = []
	args.push('autoRun.js')
	cp.spawn("node", args)
})

