const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt-nodejs');

// const cn = require('./db');
// con = cn.create
// con.query('USE shopshoe');

const accountRepo = require('../models/accountRepo');

module.exports = function(passport) {
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
	// con.query("SELECT * FROM adminUsers WHERE id = ? ", [id],
	// 	function(err, rows){
	// 		done(err, rows[0]);
	// 	});
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
					const newUserMysql = {
						email: email,
						password: bcrypt.hashSync(password, null, null),
						name: req.param('name'),
						tel: req.param('tel')
					};
					accountRepo.add(newUserMysql)
					// .then(rows => {
					// 	newUserMysql.id = rows.insertId;
					// 	req.session.user = rows[0];
					// 	return done(null, newUserMysql);
					// });
					//const insertQuery = "INSERT INTO adminUsers (email, password) values (?, ?)";
					// con.query(insertQuery, [newUserMysql.email, newUserMysql.password],
					// 	function(err, rows){
					// 		newUserMysql.id = rows.insertId;
					// 		console.log(rows);
					// 		return done(null, newUserMysql);
					// });
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
				req.session.user = rows[0];
				if(rows[0].id == 1)
				{
					req.session.isSuperAdmin = true;
				}
				else
					req.session.isSuperAdmin = false;
				return done(null, rows[0]);
			})
			.catch(function(err){
    		console.log(err);
			done(err);
			});
		})
	);
}
