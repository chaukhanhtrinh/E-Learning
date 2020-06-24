const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt-nodejs');
const randomstring = require('randomstring');
const accountRepo = require('../models/accountRepo');
const mailer = require('../models/mailer');

module.exports = function(passport) 
{
	passport.serializeUser(function(user, done){
		done(null, user.id);
	});
	passport.deserializeUser(function(id, done) {
		accountRepo.singleId(id).then(rows => {
			done(null, rows[0]);
		})
		.catch(function(err){
		console.log(err);
		done(err);
		});
	});
	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email', passwordField : 'password', passReqToCallback : true}, 
		function(req, email, password, done){
			accountRepo.singleEmail(email).then(rows => {
				if(password.length < 6)
				{
					return done(null, false, req.flash('signupMessage', 'Mật khẩu phải chứa ít nhất 6 kí tự'));
				}
				if(rows.length)
				{
					return done(null, false, req.flash('signupMessage', 'Email đã tồn tại'));
				}
				else{
					const secrettoken = randomstring.generate();

					const newUserMysql = {
						email: email,
						password: bcrypt.hashSync(password, null, null),
						name: req.param('name'),
						tel: req.param('tel'),
						token: secrettoken,
						active: false
					};

					accountRepo.add(newUserMysql).then(async rows => {
						newUserMysql.id = rows.insertId;
						const html = `Xin chào,
						<br/>
						Yasuo shop cảm ơn bạn vì đã đăng kí trên web của shop!
						<br/><br/>
						Bấm vào link này để kích hoạt tài khoản: <a href="http://localhost:3000/verify?id=${newUserMysql.id}&token=${newUserMysql.token}">http://localhost:3000/verify?id=${newUserMysql.id}&token=${newUserMysql.token}</a>`;

						await mailer.sendmail('nhommuoilam@gmail.com', newUserMysql.email, 'Mail xác nhận (Yasuo Shop)', html);

						return done(null, false, req.flash('signupMessage', 'Đăng kí thành công !!! Check email để xác nhận tài khoản'));
					});
				}
			})
			.catch(function(err){
			console.log(err);
			done(err);
			});
		})
	);



	passport.use('local-login', new LocalStrategy({
		usernameField : 'email', passwordField : 'password', passReqToCallback : true}, 
		function(req, email, password, done){
			accountRepo.singleEmail(email).then(rows =>{
				if(!rows.length)
				{
					return done(null, false, req.flash('loginMessage', 'Không tìm thấy email'));
				}
				if(!bcrypt.compareSync(password, rows[0].password))
					return done(null, false, req.flash('loginMessage', 'Sai mật khẩu'));
				if(rows[0].active === 0) {
					return done(null, false, req.flash('loginMessage', 'Tài khoản chưa kích hoạt'));
				}
				req.session.user = rows[0];
				req.session.isLoggedIn = 1;
				return done(null, rows[0]);
			})
			.catch(function(err){
    		console.log(err);
			done(err);
			});
		})
	);
};
