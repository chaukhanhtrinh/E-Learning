const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from giaodich`;
	return db.load(sql);
}

exports.add = giaoDich => {	
    const sql = `insert into giaodich(magiay, mahoadon, soluong) VALUES(${giaoDich.magiay}, ${giaoDich.mahoadon}, ${giaoDich.soluong});`;
    return db.save(sql);
}

exports.top10 = () => {
	const sql = `SELECT giaodich.magiay, shoe.magiay, shoe.tengiay, shoe.giamoi, count(DISTINCT giaodich.soluong) as doanhso FROM giaodich JOIN shoe ON giaodich.magiay = shoe.magiay GROUP BY giaodich.magiay ORDER BY doanhso DESC LIMIT 10`
	return db.load(sql)
}

exports.top10Brand = () => {
	const sql = `SELECT shoe.nhanhieu, count(DISTINCT giaodich.soluong) as doanhso FROM giaodich JOIN shoe ON giaodich.magiay = shoe.magiay GROUP BY shoe.nhanhieu ORDER BY doanhso DESC LIMIT 10`
	return db.load(sql)
}