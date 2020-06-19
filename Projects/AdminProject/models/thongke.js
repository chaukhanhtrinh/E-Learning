const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from giaodich`;
	return db.load(sql);
}

exports.add = giaoDich => {	
    const sql = `insert into giaodich(makhoahoc, mahoadon, soluong) VALUES(${giaoDich.magiay}, ${giaoDich.mahoadon}, ${giaoDich.soluong});`;
    return db.save(sql);
}

exports.top10 = () => {
	const sql = `SELECT giaodich.makhoahoc, khoahoc.makhoahoc, khoahoc.tenkhoahoc, khoahoc.giamoi, count(DISTINCT giaodich.soluong) as doanhso FROM giaodich JOIN khoahoc ON giaodich.makhoahoc = khoahoc.makhoahoc GROUP BY giaodich.makhoahoc ORDER BY doanhso DESC LIMIT 10`
	return db.load(sql)
}

exports.top10Brand = () => {
	const sql = `SELECT khoahoc.mon, count(DISTINCT giaodich.soluong) as doanhso FROM giaodich JOIN khoahoc ON giaodich.makhoahoc = khoahoc.makhoahoc GROUP BY khoahoc.mon ORDER BY doanhso DESC LIMIT 10`
	return db.load(sql)
}