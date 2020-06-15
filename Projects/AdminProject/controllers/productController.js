var dataconfig = require('../data/db');
const productRepo = require('../models/productRepo');
var con = dataconfig.create;


module.exports.getDelProduct = function(req, res){
	productRepo.delete(req.params.id).then(result =>{
		if (result.affectedRows)
			res.redirect('/quan_ly_gian_hang');
	})
}

module.exports.getCategory = async function(req,res, next)
{
	var sql = "SELECT * FROM shoe";
	var brand = req.query.brand || "none";
	var color = req.query.color || "none";

	const results = await productRepo.filter(brand, color);
	console.log(results);

	var page = parseInt(req.query.page) || 1;
    var numItem = 5;

    var begin = (page - 1) * numItem;
    var end = page * numItem;

    if(req.isAuthenticated()){
    	res.render("quan_ly_gian_hang",{ action: "Quản lý gian hàng", user:req.session.user, dsGiay: results.slice(begin, end), curPage: page, brand: brand, color:color });
    }else{
    	res.render("quan_ly_gian_hang",{ action: "Quản lý gian hàng", user:req.session.user, dsGiay: results.slice(begin, end), curPage: page, brand: brand, color:color });
    }

 //    con.query(sql, function(err, results) {
	//     if (err) res.end();
	//     console.log(results);
	//     var page = parseInt(req.query.page) || 1;
	//     var numItem = 6;

	//     var begin = (page - 1) * numItem;
	//     var end = page * numItem;

	//     if(req.isAuthenticated()){
	//     	res.render("category",{data:results.slice(begin, end), curpage:page, brand:brand, color:color, sortby:sortby, user:req.user, logged: true  });
	//     }else{
	//     	res.render("category",{data:results.slice(begin, end), curpage:page, brand:brand, color:color, sortby:sortby, logged: false  });
	//     }
	// });
};

module.exports.postPreviewAvatar = function(req, res, next)
{
	productRepo.upload(req, res, (err) => {
    if(err){
      res.render("changeProductImage", {
        msg: err, action: 'Thay đổi ảnh'});
    } else {
      if(req.file == undefined){
        res.render("changeProductImage", {
          msg: 'Error: No File Selected!', user: req.session.user, action: 'Thay đổi ảnh'});
      } else {
        res.render('changeProductImage', {
          file: `upload/${req.file.filename}`, user: req.session.user, action: 'Thay đổi ảnh'});
      }
    }});
};

module.exports.getUpdateProduct = function(req, res, next) {
	productRepo.singleId(req.query.id).then(giay =>{
		res.render('updateProduct', { action: "Chỉnh sửa sản phẩm", user:req.session.user, giay:giay[0] });
	})
}

module.exports.getAddProduct = function(req, res, next) {
	res.render('addProduct', { action: "Thêm sản phẩm", user:req.session.user, message:req.flash('addProductMessage'), file: '' });
}
module.exports.postAvatar = function(req, res, next)
{
	productRepo.upload(req, res, (err) => {
	    if(err){
	      res.render("addProduct", {
	        msg: err,  action: 'Thêm sản phẩm'});
	  	}
	  	res.render("addProduct", {file: `upload/${req.file.filename}`, user: req.session.user, action: 'Thêm sản phẩm', message: ''});
	});
};

module.exports.postUpdateProduct = function(req, res, next){
	const giay = {
		magiay: req.query.id,
		anh: req.param('anh'),
		tengiay: req.param('tengiay'),
		soluong: req.param('soluong'),
		nhanhieu: req.param('nhanhieu'),
		mau: req.param('mau'),
		giacu: req.param('giacu'),
		giamoi: req.param('giamoi')
	};
	productRepo.update(giay).then(value => {
        productRepo.singleId(giay.magiay).then(rows => {
            if (rows.length > 0) {
                res.redirect('/quan_ly_gian_hang');
            }
        });
	});
}

module.exports.postAddProduct = function(req, res, next){
	const giay = {
		magiay: req.param('magiay'),
		anh: req.param('anh'),
		tengiay: req.param('tengiay'),
		soluong: req.param('soluong'),
		nhanhieu: req.param('nhanhieu'),
		mau: req.param('mau'),
		giacu: req.param('giacu'),
		giamoi: req.param('giamoi')
	};
	productRepo.singleId(giay.magiay).then(result => {
		if(result.length)
		{
			req.flash('addProductMessage', 'Mã giày đã tồn tại');
			res.redirect('/addProduct');
		}
		else{
				productRepo.add(giay).then(rows => {
                	res.redirect('/quan_ly_gian_hang');
            });
		};
	});
}

module.exports.getChangeAvatar = function(req, res, next) {
	res.render('changeProductImage',{action: "Thay đổi ảnh sản phẩm", user:req.session.user});
}