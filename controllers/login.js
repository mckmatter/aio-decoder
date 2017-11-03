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
  if(req.body.user){
  	User.authenticate(req.body, function(err, token) {
  		if(err){
  			res.sendStatus(403)
  		}
  		else {
        console.log('LOGIN RES: sendToken: ' + token)
  			res.send(token).status(200);
  		}
  	})
  } 
  else{
    console.log("LOGIN: NO username")
  	res.render('login');
  }
})


module.exports = router;


