const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt-nodejs');

var db = require('../data/db');
var con = db.create;

const storage = multer.diskStorage({
  destination: './public/upload/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

exports.upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('myImage');

function checkFileType(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    cb('Error: Images Only!');
  }
}

exports.update = user => {
  const sql=`update users set name='${user.name}',  tel='${user.tel}' where id=${user.id};`;
  return db.save(sql);
}

exports.singleId = (id) => {
    var sql = `select * from users where id=${id};`;
    return db.load(sql);
}

exports.updatepassword = password => {
  const newPassword = bcrypt.hashSync(password.newpassword, null, null);
  const sql = `update users set password='${newPassword}' where id=${password.id};`;
  return db.save(sql);
}