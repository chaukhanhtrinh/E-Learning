const multer = require('multer');
const path = require('path');
const db = require('../data/db');

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

exports.loadAll = () => {
	const sql=`select * from shoe`;
	return db.load(sql);
}

exports.add = giay => {
    const sql = `insert into khoahoc(anh, tenkhoahoc, soluong, mon, giaovien, giacu, giamoi) VALUES('${giay.anh}', '${giay.tengiay}', '${giay.soluong}', '${giay.nhanhieu}', '${giay.mau}', ${giay.giacu}, ${giay.giamoi});`;
    return db.save(sql);
}


exports.update = giay => {
	const sql=`update shoe set anh='${giay.anh}', tengiay='${giay.tengiay}', soluong='${giay.soluong}', nhanhieu='${giay.nhanhieu}', mau='${giay.mau}', giacu=${giay.giacu}, giamoi=${giay.giamoi} where magiay=${giay.magiay};`;
	return db.save(sql);
}

exports.delete = (magiay) => {
	const sql=`delete from shoe where magiay=${magiay};`;
	return db.save(sql);
}

exports.singleId = (magiay) => {
    var sql = `select * from shoe where magiay=${magiay};`;
    return db.load(sql);
}

exports.filter = (brand, color) => {
	var sql = "SELECT * FROM shoe";
	var check = 0;

	if(brand != "none") 
	{
		sql = sql + " WHERE nhanhieu = '" + brand + "'";
		check = 1;
	}

	if(color != "none")
	{
		if(check == 0)
		{
			sql = sql + " WHERE mau = '" + color + "'";
		}
		else
		{
			sql = sql + " AND mau = '" + color + "'";
		}
	}

    return db.load(sql);
}