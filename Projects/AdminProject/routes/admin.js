const accountController = require('../controllers/accountController');
const productController = require('../controllers/productController');
const hoadonController = require('../controllers/hoadonController');

module.exports = function(router, passport){
	router.get('/', function(req, res, next) {
		res.render('admin_login', { message:req.flash('loginMessage')});
	});

	router.get('/signup', isSuperAdmin, function(req, res){ accountController.getSignup(req, res) });

	router.get('/index', isLoggedIn, function(req, res, next) {
		res.render('index', { action: "Điều khiển", user:req.session.user });
	});

	router.get('/quan_ly_gian_hang', isLoggedIn, function(req, res, next) {
		productController.getCategory(req, res, next);
	});

	router.get('/quan_ly_gian_hang/delete/:id', isLoggedIn, function(req, res){ productController.getDelProduct(req, res) });
	//update san pham
	router.get('/update', isLoggedIn, function(req, res, next) { productController.getUpdateProduct(req, res, next)});
	//them san pham
	router.get('/addProduct', isLoggedIn, function(req, res, next) { productController.getAddProduct(req, res, next) });



	router.get("/user_profile:id", isLoggedIn, function(req, res, next){ accountController.getuserprofile(req, res, next) });

	router.get('/profile', isLoggedIn, function(req, res, next) { accountController.getProfile(req, res, next) });

	router.get('/quan_ly_admin', isSuperAdmin, function(req, res, next) { accountController.getQuanLyAdmin(req, res, next) });

	router.get('/quan_ly_account', isLoggedIn, function(req, res, next) { accountController.getQuanLyAccount(req, res, next )});

	router.get('/quan_ly_don_hang', isLoggedIn, function(req, res, next) { hoadonController.getQuanLyDonHang(req, res, next) })

	router.get('/thong_ke', isLoggedIn, function(req, res, next) { hoadonController.getThongKe(req, res, next) });

	router.get('/chinh_sua_profile', isLoggedIn, function(req, res, next) { accountController.getChinhSuaProfile(req, res, next) });

	router.get('/logout', function(req, res){ accountController.getLogout(req, res) });

	router.get('/quan_ly_account/delete/:id', isLoggedIn, function(req, res){ accountController.getDelAcc(req, res) });

	router.get('/quan_ly_admin/delete/:id', isSuperAdmin, function(req, res){ accountController.getDelAdmin(req, res) });

	router.get('/quan_ly_don_hang/notdely/:id', isLoggedIn, function(req, res){ hoadonController.getNotDeli(req, res) });

	router.get('/quan_ly_don_hang/delivering/:id', isLoggedIn, function(req, res){ hoadonController.getDelivering(req, res) })

	router.get('/quan_ly_don_hang/deliveried/:id', isLoggedIn, function(req, res){ hoadonController.getDeliveried(req, res) })

	//Post

	router.post('/', passport.authenticate('local-login', 
		{
			successRedirect: '/index',
			failureRedirect: '/',
			failureFlash: true
		}), 
		function(req, res) { accountController.postLogin(req, res) }
	);

	router.post('/signup', function(req, res){ accountController.postSignUp(req, res)})

	router.post('/chinh_sua_profile', function(req, res){ accountController.postChinhSuaProfile(req, res) });
		//PRODUCT
			//update product
	router.post('/update', function(req, res, next){ productController.postUpdateProduct(req,res,next) });
			//add product
	router.post('/addProduct', function(req, res, next){ productController.postAddProduct(req, res, next) });

	router.get('/changeproductimage', function(req, res, next) { productController.getChangeAvatar(req, res, next) })

	router.post("/previewavatar", function(req, res, next){ productController.postPreviewAvatar(req, res, next) });

	router.post("/changeavatar", function(req, res, next){ productController.postAvatar(req, res, next) });
}
function isLoggedIn(req, res, next){
	if(req.isAuthenticated())
		return next();
	res.redirect('/');
}
function isSuperAdmin(req, res, next){
	if(req.session.isSuperAdmin == true)
	{
		return next();
	}
	res.redirect('/index');
}