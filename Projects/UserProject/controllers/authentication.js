const randomstring = require('randomstring');
const bcrypt = require('bcrypt-nodejs');
var dataconfig = require('../data/db');
var con = dataconfig.create;

const accountRepo = require('../models/accountRepo');
const mailer = require('../models/mailer');

module.exports.getRegistration = function(req, res, next) {
    if(req.isAuthenticated())
    {
    	res.render("registration", { message: req.flash('signupMessage'), user:req.user, logged: true  });
    }else{
    	res.render("registration", { message: req.flash('signupMessage'), logged: false  });
    }
};

module.exports.getBlog = function(req, res, next) {
    if(req.isAuthenticated()){
    	res.render("blog", { user:req.user, logged: true  });
    }else{
    	res.render("blog", { logged: false  });
	}
};

module.exports.getContact = function(req, res, next) {
	if(req.isAuthenticated()){
    	res.render("contact", { user:req.user, logged: true  });
    }else{
    	res.render("contact", { logged: false  });
    }
};

module.exports.getForget = function(req, res, next) {
	res.render("forgetPassword", { logged: false  });
};

module.exports.getResetPassword = async function(req, res, next) {
	const userid = req.query.id;
	const tokenstring = req.query.token;

	const user = await accountRepo.singleId(userid);
	
	console.log(userid);
	console.log(user[0].token);
	console.log(tokenstring);

	if(user[0].token == tokenstring) {
		await accountRepo.updateActive(user[0]);
		res.render("resetpassword", { logged: false, rels: 'success', id: userid });
	}
	else
	{
		res.render("resetpassword", { logged: false, rels: 'fail'  });
	}
};

module.exports.getLogin = function(req, res, next) {
 	res.render("login", { message:req.flash('loginMessage'), logged: false  });
};

module.exports.getLogout = function(req, res){
	req.logout();
	req.session.isLoggedIn = 0;
    backURL=req.header('Referer') || '/';
 	res.redirect(backURL);
};

module.exports.postLogin = function(req, res) {
	if(req.body.remember){
		req.session.cookie.maxAge = 1000 * 60 * 3;
	}else{
		req.session.cookie.expires = false;
	}
	//res.redirect('/login');
};

module.exports.postVerify = async function(req, res, next) {
	const userid = req.query.id;
	const tokenstring = req.query.token;

	const user = await accountRepo.singleId(userid);
	
	console.log(userid);
	console.log(user[0].token);
	console.log(tokenstring);
		await accountRepo.updateActive(user[0]);
		res.render('verify',{msg: "Khích hoạt thành công", logged: false});
};

module.exports.postForget = async function(req, res, next) {
	const useremail = req.param('email');
	console.log(useremail);
	const user = await accountRepo.singleEmail(useremail);
	console.log(user[0]);
	if(user[0].active == 0)
	{
		res.render('forgetPassword',{msg: "Tài khoản này chưa khích hoạt", logged: false});
	}
	else
	{
		const secrettoken = randomstring.generate(); 

		const tokenUser = {
			id: user[0].id,
			token: secrettoken
		}

		await accountRepo.updateToken(tokenUser);

		const html = `Xin chào,
		<br/>
		Yasuo shop gửi bạn link để reset mật khẩu, không nên chia sẻ link cho người khác.
		<br/><br/>
		Bấm vào link này để reset mật khẩu: <a href="http://localhost:3000/resetpassword?id=${tokenUser.id}&token=${tokenUser.token}">http://localhost:3000/resetpassword?id=${tokenUser.id}&token=${tokenUser.token}</a>`;

		await mailer.sendmail('nhommuoilam@gmail.com', user[0].email, 'Mail reset mật khẩu (Yasuo Shop)', html);

		res.render('forgetPassword',{msg: "Đã gửi mail reset mật khẩu đến địa chỉ email", logged: false});
	}
};

module.exports.postResetPassword = async function(req, res, next) {
	const userid = req.query.id;
	const newpassword = req.param('newpassword');

	console.log(userid);
	console.log(newpassword);

	const passwordBundle = {
		id: userid,
		password: bcrypt.hashSync(newpassword, null, null)
	}

	await accountRepo.updatePassword(passwordBundle);
	res.render('resetpassword',{ rels: 'done', logged: false});
}
