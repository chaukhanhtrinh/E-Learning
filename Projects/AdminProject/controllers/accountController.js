const accountRepo = require('../models/accountRepo');
const accountUsersRepo = require('../models/accountUsersRepo');
const bcrypt = require('bcrypt-nodejs');


module.exports.getProfile = function(req, res, next) {
	res.render('profile', { action: "Profile", user:req.session.user });
}

module.exports.getSignup = function(req, res){
	res.render('signup', {message: req.flash('signupMessage')});
}

module.exports.getChinhSuaProfile = function(req, res, next) {
	res.render('chinh_sua_profile', { action: "Chỉnh sửa profile", user:req.session.user });
}

module.exports.getuserprofile = function(req, res, next) {
	accountUsersRepo.singleId(req.params.id).then(rows =>{
		res.render('userprofile', { action: "Profile người dùng", user:rows[0] });
	})
}

module.exports.getQuanLyAdmin = function(req, res, next) {
	accountRepo.loadAll().then(rows => {
		const page = parseInt(req.query.page) || 1;
		const perPage = 5;
		let start = (page - 1) * perPage;
		let end = page * perPage;
		res.render('quan_ly_admin', { action: "Quản lý Admin", user:req.session.user, users: rows.slice(start, end), curPage: page });	
	})
}

module.exports.getQuanLyAccount = function(req, res, next) {
	accountUsersRepo.loadAll().then(rows => {
		const page = parseInt(req.query.page) || 1;
		const perPage = 5;
		let start = (page - 1) * perPage;
		let end = page * perPage;
		res.render('quan_ly_account', { action: "Quản lý người dùng", user:req.session.user, users: rows.slice(start, end), curPage: page });	
	})
}

module.exports.getDelAcc = function(req, res){
	accountUsersRepo.stt(req.params.id).then(result =>{
		if (result.affectedRows)
			res.redirect('/quan_ly_account');
	})
}

module.exports.getDelAdmin = function(req, res){
	accountRepo.stt(req.params.id).then(result =>{
		if (result.affectedRows)
			res.redirect('/quan_ly_admin');
	})
}

module.exports.getLogout = function(req, res){
	req.logout();
	res.redirect('/');
}

module.exports.postChinhSuaProfile = function(req, res){
	const user = {
		id: req.session.user.id,
		email: req.param('email'),
		password: bcrypt.hashSync(req.param('password'), null, null),
		name: req.param('name'),
		tel: req.param('tel')
	};
	accountRepo.update(user).then(value => {
        accountRepo.singleId(user.id).then(rows => {
            if (rows.length > 0) {
                req.session.user=rows[0];
                res.redirect('/profile');
            }
        });
	});
}

module.exports.postSignUp = function(req, res){
	const passwordField = req.param('password');
	const emailField = req.param('email');
	const user = {
		email: emailField,
		password: bcrypt.hashSync(passwordField, null, null),
		name: req.param('name'),
		tel: req.param('tel')
	};
	accountRepo.singleEmail(emailField).then(result => {
		if(passwordField.length < 6)
		{
			req.flash('signupMessage', 'Mật khẩu phải chứa ít nhất 6 kí tự');
			res.redirect('/signup');
		}
		if(result.length)
		{
			req.flash('signupMessage', 'Email đã tồn tại');
			res.redirect('/signup');
		}
		else{
				accountRepo.add(user).then(rows => {
				if (rows.length > 0) 
				{
                	req.session.user=rows[0];
                	res.redirect('/quan_ly_account');
                }
            });
		};
		res.redirect('/quan_ly_account')
	});
}

module.exports.postLogin = function(req, res) {
	if(req.body.remember){
		req.session.cookie.maxAge = 1000 * 60 * 3;
	}else{
		req.session.cookie.expires = false;
	}
	res.redirect('/');
}