var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	res.render('index');
});
router.get('/1', function(req, res){
	res.render('1');
});
router.get('/2', function(req, res){
	res.render('2');
});
router.get('/3', function(req, res){
	res.render('3');
});
router.get('/4', function(req, res){
	res.render('4');
});
router.get('/5', function(req, res){
	res.render('5');
});
router.get('/6', function(req, res){
	res.render('6');
});
router.get('/7', function(req, res){
	res.render('7');
});
router.get('/8', function(req, res){
	res.render('8');
});
router.get('/9', function(req, res){
	res.render('9');
});

module.exports = router;