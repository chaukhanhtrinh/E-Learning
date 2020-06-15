var db = require('../data/db');

exports.loadAll = () => {
	var sql=`select * from users`;
	return db.load(sql);
}

exports.add = user => {
    var sql = `insert into users(email, password, name, tel) values('${user.email}', '${user.password}', '${user.name}', '${user.tel}');`;
    return db.save(sql);
}

exports.login = user => {
	var sql=`select * from users where email='${user.email}' and password='${user.password}';`;
	return db.load(sql);
}

exports.update = user => {
	var sql=`update users set name='${user.name}', password='${user.password}', email='${user.email}', tel=${user.tel} where id=${user.id};`;
	return db.save(sql);
}

exports.stt = (id) => {
	var sql=`update users set stt=0 where id=${id};`;
	return db.save(sql);
}

exports.singleId = (id) => {
    var sql = `select * from users where id=${id};`;
    return db.load(sql);
}

exports.singleEmail = (email) => {
    var sql = `select * from users where email='${email}';`;
    return db.load(sql);
}