var Cart = require('../models/cartModel');
var Product = require('../models/productModel')
var HoaDon = require('../models/hoadonModel')
var GiaoDich = require('../models/giaodichModel')
const { default: Stripe } = require("stripe");

var stripe = require("stripe")("sk_test_MRlOBa2xxVhOOfbez5ieOODU00mFwFFh18")
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}

module.exports.getCart = function(req, res, next) {
	if(!req.session.cart)
	{
		if(req.isAuthenticated()){
			res.render("cart", { user:req.user, logged: true, products: null });	
		}
		else res.render("cart", { logged: false, products: null });
	}
	let cart = new Cart(req.session.cart);
	if(req.isAuthenticated()){
		res.render("cart", { user:req.user, logged: true, products: cart.generateArray(), totalPrice: cart.totalPrice });
	}
	else res.render("cart", { logged: false, products: cart.generateArray(), totalPrice: cart.totalPrice });
};

module.exports.getCheckout =function(req, res, next) {
	if(req.isAuthenticated())
	{
		if(!req.session.cart)
		{
	    	res.redirect('/');
	    }
	    let cart = new Cart(req.session.cart);
	    res.render("checkout", { user:req.user, logged: true, products: cart.generateArray(), totalPrice: cart.totalPrice });
	}
else res.redirect('/login');
};

module.exports.getHistory =function(req, res, next) {
	if(req.isAuthenticated())
	{
		HoaDon.history(req.session.user.id).then(rows =>{
			return res.render("history", { user:req.user, logged: true, bills: rows  });
		})
	}
	else
		res.redirect('/login');
};

module.exports.getConfirmation = function(req, res, next) {
	if(req.isAuthenticated())
	{
		n =  new Date();
		y = n.getFullYear();
		m = n.getMonth() + 1;
		d = n.getDate();
		let cart = new Cart(req.session.cart);
	    req.session.cart = null
	    res.render("confirmation", { user:req.user, logged: true, products: cart.generateArray(), totalPrice: cart.totalPrice, d:d, m:m, y:y});
	}
	else res.redirect('/login');
};

module.exports.getClear = function(req, res, next){
	req.session.cart=null
	if(req.session.cart==null)
		res.redirect('/cart')
};

module.exports.getAddToCart = function(req, res, next) {
	let productId = req.params.id;
	let cart = new Cart(req.session.cart ? req.session.cart : {});
	Product.singleId(productId).then(rows => {
		cart.add(rows[0], rows[0].makhoahoc);
		req.session.cart = cart;
		console.log(req.session.cart);    
		backURL=req.header('Referer') || '/';
 		res.redirect(backURL);
	})
	.catch(function(err){
		console.log("Loi" + err);
		backURL=req.header('Referer') || '/';
 		res.redirect(backURL);
	});
};
//POST

module.exports.postCheckout = function(req, res, next) {
	if(req.isAuthenticated())
	{
		if(!req.session.cart)
		res.redirect('/')
		const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
		const cart = new Cart(req.session.cart);
		const products = cart.generateArray();
		const hoadon = {
			id: req.session.user.id,
			thanhtien: cart.totalPrice,
			ngaythanhtoan: date,
			name: req.param('name'),
			phonenumber: req.param('phonenumber'),
			email: req.param('email'),
			address: req.param('address')
		}
		HoaDon.add(hoadon).then(rows => {
			hoadon.mahoadon = rows.insertId;
			console.log(rows.insertId)
			for(let i=0; i<products.length;i++)
			{
				const giaodich = {
					makhoahoc: products[i].item.makhoahoc,
					soluong: products[i].qty,
					mahoadon: hoadon.mahoadon
				}
				GiaoDich.add(giaodich).then(rows => {})
				.catch(error => console.log(error.message))
			}
			var token = req.body.stripeToken;
				var chargeAmount = req.body.chargeAmount;
				stripe.customers.create({
					email:req.body.stripeEmail,
					source: req.body.stripeToken
				})
				.then(customer=>stripe.charges.create({
					amount: chargeAmount,
					description:'Payment courses',
					currency:'usd',
					customer:customer.id
				}))
					
			console.log("Đặt hàng thành công!")
			res.redirect('/confirmation')
		}).catch(error => console.log(error.message))
	}
	else	res.redirect('/login')
}
			
		