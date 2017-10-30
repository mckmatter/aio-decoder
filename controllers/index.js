/*
This is the index controller. All requests that
are not satisfied by a static file in the public
folder hit this index controller and then are
forwarded to the appropriate controller.

mckmatter - 2017
*/

//Use the Router method within Express
var express = require('express')
var router = express.Router()

//Streams Table
router.use('/streams', require('./streams'))

//Login
//router.use('/login', require('./login'))

//Export the routes to app.js
module.exports = router;

