const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from giaodich`;
	return db.load(sql);
}

exports.add = giaoDich => {	
    const sql = `insert into giaodich(makhoahoc, mahoadon, soluong) VALUES(${giaoDich.makhoahoc}, ${giaoDich.mahoadon}, ${giaoDich.soluong});`;
    return db.save(sql);
}