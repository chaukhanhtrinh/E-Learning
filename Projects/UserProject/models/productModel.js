const db = require('../data/db');

exports.loadAll = () => {
	const sql=`select * from khoahoc`;
	return db.load(sql);
}

exports.add = giay => {
    const sql = `insert into khoahoc(makhoahoc, anh, tenkhoahoc, soluong, mon, giaovien, giacu, giamoi) VALUES('${giay.makhoahoc}', '${giay.anh}', '${giay.tenkhoahoc}', '${giay.soluong}', '${giay.mon}', '${giay.giaovien}', ${giay.giacu}, ${giay.giamoi});`;
    return db.save(sql);
}


exports.update = giay => {
	const sql=`update khoahoc set anh='${giay.anh}', tenkhoahoc='${giay.tenkhoahoc}', soluong='${giay.soluong}', mon='${giay.mon}', giaovien='${giay.giaovien}', giacu=${giay.giacu}, giamoi=${giay.giamoi} where makhoahoc='${giay.makhoahoc}';`;
	return db.save(sql);
}

exports.delete = (makhoahoc) => {
	const sql=`delete from khoahoc where makhoahoc='${makhoahoc}';`;
	return db.save(sql);
}

exports.singleId = (makhoahoc) => {
    var sql = `select * from khoahoc where makhoahoc=${makhoahoc};`;
    return db.load(sql);
}