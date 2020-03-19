var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	res.render('cart');
});
router.get('/checkout', function(req, res){
	res.render('checkout');
});
router.post('/shipping', function(req, res){
	res.render('shipping');
});
router.post('/payment', function(req, res){
	res.render('payment');
});

module.exports = router;