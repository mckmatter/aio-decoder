/*
This is the controll for requests made to
-- /login --

mckmatter - 2017
*/

//Require Express
var express = require('express')
var router = express.Router()

var User = require('../models/User');

var failed = "Authentication Failed"

router.get('/', function(req, res) {
	res.render('login', {result: failed});
})



router.post('/', function(req, res) {
  console.log('POST: /login')
  console.log(req.body)

  	User.authenticate(req.body, function(err, token) {
  		if(err){
        console.log(err)
  			res.sendStatus(err)
  		}
  		else {
  			res.send(token).status(200);
  		}
  	})

})


module.exports = router;


