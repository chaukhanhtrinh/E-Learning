var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	res.render('litBooks');
});
router.get('/1', function(req, res){
	res.render('21');
});
router.get('/2', function(req, res){
	res.render('22');
});
router.get('/3', function(req, res){
	res.render('23');
});
router.get('/4', function(req, res){
	res.render('24');
});

module.exports = router;