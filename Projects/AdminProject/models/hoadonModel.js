const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from hoadon`;
	return db.load(sql);
}

exports.cashByDay = () => {
	const sql=`SELECT date(ngaythanhtoan) as ngay, sum(thanhtien) as tien FROM hoadon group BY date(ngaythanhtoan)`;
	return db.load(sql);
}

exports.cashByYear = () => {
	const sql=`SELECT year(ngaythanhtoan) as nam, sum(thanhtien) as tien FROM hoadon group BY year(ngaythanhtoan)`;
	return db.load(sql);
}

exports.cashByMonth = () => {
	const sql=`SELECT month(ngaythanhtoan) as thang, year(ngaythanhtoan) as nam, sum(thanhtien) as tien FROM hoadon group BY month(ngaythanhtoan), year(ngaythanhtoan)`;
	return db.load(sql);
}

exports.cashByWeek = () => {
	const sql=`SELECT week(ngaythanhtoan) as tuan, year(ngaythanhtoan) as nam, sum(thanhtien) as tien FROM hoadon group BY week(ngaythanhtoan), year(ngaythanhtoan)`;
	return db.load(sql);
}

exports.cashByQuarter = () => {
	const sql=`SELECT quarter(ngaythanhtoan) as quy, year(ngaythanhtoan) as nam, sum(thanhtien) as tien FROM hoadon group BY quarter(ngaythanhtoan), year(ngaythanhtoan)`;
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

exports.checkInNotDeliveryYet = id => {
	const sql=`update hoadon set tinhtranggiao=2 where mahoadon=${id};`;
	return db.save(sql);
}

exports.checkInDelivering = id => {
	const sql=`update hoadon set tinhtranggiao=0 where mahoadon=${id};`;
	return db.save(sql);
}