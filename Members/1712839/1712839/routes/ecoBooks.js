var express = require('express');
var router = express.Router();


router.get('/', function(req, res){
	res.render('ecoBooks');
});
router.get('/1', function(req, res){
	res.render('31');
});
router.get('/2', function(req, res){
	res.render('32');
});
router.get('/3', function(req, res){
	res.render('33');
});
router.get('/4', function(req, res){
	res.render('34');
});

module.exports = router;