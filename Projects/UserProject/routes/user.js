var authControl = require('../controllers/authentication');
var categoryControl = require('../controllers/categoryController');
var searchControl = require('../controllers/searchController');
var profileControl = require('../controllers/profileController');
var shoppingController = require('../controllers/shoppingController');

module.exports = function(router, passport){
	router.get("/", function(req, res, next){ categoryControl.getRoot(req, res, next) });

	router.get("/profile", function(req, res, next){ profileControl.getProfile(req, res, next) });

	router.get("/updateprofile", function(req, res, next){ profileControl.getUpdateProfile(req, res, next) });

	router.get("/updatepassword", function(req, res, next){ profileControl.getUpdatePassword(req, res, next) });

	router.get("/changeavatar", function(req, res, next){ profileControl.getAvatar(req, res, next) });


	router.get("/index", function(req, res, next){ categoryControl.getRoot(req, res, next) });

	router.get("/search", function(req, res, next){ searchControl.getCategory(req, res, next) });

	router.get("/category", function(req, res, next){ categoryControl.getCategory(req, res, next) });

	router.get("/chitiet:id", function(req, res, next){ categoryControl.getChitiet(req, res, next) });

	router.get('/registration', function(req, res, next){ authControl.getRegistration(req, res, next) });

	router.get('/blog', function(req, res, next){ authControl.getBlog(req, res, next) });

	router.get('/cart', function(req, res, next){ shoppingController.getCart(req, res, next) });

	router.get('/add-to-cart/:id', function(req, res, next){ shoppingController.getAddToCart(req, res, next) });

	router.get('/checkout',function(req, res, next){ shoppingController.getCheckout(req, res, next) });

	router.get('/history',function(req, res, next){ shoppingController.getHistory(req, res, next) });

	router.get('/contact', function(req, res, next){ authControl.getContact(req, res, next) });

	router.get('/forgetPassword', function(req, res, next){ authControl.getForget(req, res, next) });

	router.get('/resetpassword', function(req, res, next){ authControl.getResetPassword(req, res, next) });

	router.get('/confirmation', function(req, res, next){ shoppingController.getConfirmation(req, res, next) });

	router.get('/login', function(req, res, next){ authControl.getLogin(req, res, next) });

	router.get('/logout', function(req, res, next){ authControl.getLogout(req, res) });

	router.get('/clear-cart', function(req, res, next){ shoppingController.getClear(req, res, next) })

	router.get('/pay', function(req, res, next){ authControl.getPay(req, res, next)	})

	//POST
	router.post('/checkout', function(req, res, next){ shoppingController.postCheckout(req, res, next)	})

	router.post('/login', passport.authenticate('local-login', 
		{
			successRedirect: '/checkout',
			failureRedirect: '/login',
			failureFlash: true
		}), function(req, res) { authControl.postLogin(req, res) });

	router.post('/registration', passport.authenticate('local-signup', {
		successRedirect: '/registration',
		failureRedirect: '/registration',
		failureFlash: true
	}));
	
	router.post("/chitiet:id", function(req, res, next){ categoryControl.postChitiet(req, res, next)});

	router.post("/previewavatar", function(req, res, next){ profileControl.postPreviewAvatar(req, res, next) });

	router.post("/changeavatar", function(req, res, next){ profileControl.postAvatar(req, res, next) });

	router.post("/updateprofile", function(req, res, next){ profileControl.postUpdateProfile(req, res, next) });

	router.post("/updatepassword", function(req, res, next){ profileControl.postUpdatePassword(req, res, next) });

	router.post('/forgetPassword', function(req, res, next){ authControl.postForget(req, res, next) });

	router.get("/verify", function(req, res, next){ authControl.postVerify(req, res, next) });

	router.post('/resetpassword', function(req, res, next){ authControl.postResetPassword(req, res, next) });

};