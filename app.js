/*
This is the entry point for the Node application.

This is the file that should be started on login
by the Raspberry Pi. 

mckmatter - 2017
*/

//Require Frameworks and expose Express
var express = require('express')
var mustache = require('mustache-express')
var app = express()

//Set the View Engine and pass templates directory
app.engine('mustache', mustache())
app.set('view engine', 'mustache')
app.set('views', __dirname + '/views')

//Setup Static Routes
app.use(express.static('public'))

//Setup All Other Routes
app.use(require('./controllers'))

//Start Server
var port = 3000
app.listen(port, function() {
	console.log('App listening at: ' + port)
})