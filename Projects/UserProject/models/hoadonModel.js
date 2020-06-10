const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from hoadon`;
	return db.load(sql);
}

exports.add = hoaDon => {
    const sql = `insert into hoadon(id, thanhtien, ngaythanhtoan, name, phonenumber, email, address) VALUES(${hoaDon.id}, ${hoaDon.thanhtien}, '${hoaDon.ngaythanhtoan}', '${hoaDon.name}', '${hoaDon.phonenumber}', '${hoaDon.email}', '${hoaDon.address}');`;
    return db.save(sql);
}

exports.checkInDelivery = id => {
	const sql=`update hoadon set tinhtranggiao=1 where mahoadon=${id};`;
	return db.save(sql);
}
exports.history = id =>{
	const sql=`select * from giaodich as gd join hoadon as hd on gd.mahoadon = hd.mahoadon where id=${id};`;
	return db.load(sql);
}