const fs = require('fs');
const promisify = require('util').promisify;
const bcrypt = require('bcrypt-nodejs');

var dataconfig = require('../data/db');
var profile = require('../models/profileModel');
var con = dataconfig.create;
deleteFile = promisify(fs.unlink);

module.exports.getProfile = function(req, res, next)
{
	if(req.isAuthenticated())
	{
		res.render("profile",{ user:req.user, logged: true });
	}else{
		res.redirect('/');
    }
};

module.exports.getUpdateProfile = function(req, res, next)
{
	if(req.isAuthenticated())
	{
		res.render("updateprofile",{ user:req.user, logged: true });
	}else{
		res.redirect('/');
    }
};

module.exports.getUpdatePassword = function(req, res, next)
{
	if(req.isAuthenticated())
	{
		res.render("updatepassword",{ user:req.user, logged: true });
	}else{
		res.redirect('/');
    }
};

module.exports.getAvatar = function(req, res, next)
{
	if(req.isAuthenticated())
	{
		res.render("change-profile-avatar",{ user:req.user, logged: true });
	}else{
		res.redirect('/');
    }
};

module.exports.postPreviewAvatar = function(req, res, next)
{
	profile.upload(req, res, (err) => {
    if(err){
      res.render("change-profile-avatar", {
        msg: err, user:req.user, logged: true
      });
    } else {
      if(req.file == undefined){
        res.render("change-profile-avatar", {
          msg: 'Error: No File Selected!', user:req.user, logged: true
        });
      } else {
        res.render('change-profile-avatar', {
          file: `upload/${req.file.filename}`, user:req.user, logged: true
        });
      }
    }});
};

module.exports.postAvatar = function(req, res, next)
{
	profile.upload(req, res, (err) => {
	    if(err){
	      res.render("change-profile-avatar", {
	        msg: err, user:req.user, logged: true
	      });
	  	}
		else if(req.user.avatar != ""){
			// deleteFile(`upload/${req.file.filename}`)
			// .then(() => {
			// 	con.query("UPDATE users SET avatar = 'upload/" + req.file.filename 
			// 		      + "' WHERE id = " + req.user.id, function (err, results) {
			// 		      	if (err) throw(err);
			// 		      	console.log(results.affectedRows + " record(s) updated");
			// 		      	res.render("profile",{ user:req.user, logged: true});
			// 		      });
			// })
			fs.unlink(`public/${req.user.avatar}`, function (err) {            
              if (err) {                                                 
                  console.error(err);                                    
              }                                                          
             con.query("UPDATE users SET avatar = 'upload/" + req.file.filename + "' WHERE id = " + req.user.id, function (err, results) {
				      	if (err) throw(err);
				      	console.log(results.affectedRows + " record(s) updated");
				      	res.redirect('/profile');
				      });                           
          	});   
		}
		else
		{
			con.query("UPDATE users SET avatar = 'upload/" + req.file.filename 
					      + "' WHERE id = " + req.user.id, function (err, results) {
					      	if (err) throw(err);
					      	console.log(results.affectedRows + " record(s) updated");
					      	res.redirect('/profile');
					      });
		}
	});
};

module.exports.postUpdateProfile = function(req, res, next)
{
	const newProfile = {
		id: req.query.id,
		name: req.param('name'),
		tel: req.param('tel')
	};
	profile.update(newProfile).then(value => {
	        profile.singleId(newProfile.id).then(rows => {
	            if (rows.length > 0) {
	                res.redirect('/profile');
	            }
	        });
    	});
};

module.exports.postUpdatePassword = function(req, res, next)
{
	const password = {
		id: req.query.id,
		oldpassword: req.param('oldpassword'),
		newpassword: req.param('newpassword')
	};
	if(!bcrypt.compareSync(password.oldpassword, req.user.password)){
		res.render("updatepassword",{msg:"Mật khẩu cũ không chính xác", user:req.user, logged: true});
	} 
	else if (password.newpassword.length < 6){
		res.render("updatepassword",{msg:"Mật khẩu mới phải nhiều hơn 6 kí tự", user:req.user, logged: true});
	}
	else {
		profile.updatepassword(password).then(value => {
	        profile.singleId(password.id).then(rows => {
	            if (rows.length > 0) {
	                res.render('profile',{msg:"Thay đổi mật khẩu thành công", user:req.user, logged: true});
	            }
	        });
    	});
	}
};
