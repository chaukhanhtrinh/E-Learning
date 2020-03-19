var express = require('express');
var router = express.Router();

router.get('/register', function(req, res){
	res.render('register');
});
router.get('/login', function(req, res){
	res.render('login');
});
router.get('/orders', function(req, res){
	res.render('orderhistory');
});
router.get('/orders/1', function(req, res){
	res.render('orderdetails1');
});

module.exports = router;
 