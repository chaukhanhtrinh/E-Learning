var db = require('../data/db');

exports.loadAll = () => {
	var sql=`select email from users`;
	return db.load(sql);
}

exports.add = user => {
    var sql = `insert into users(email, password, name, tel, token, active) values('${user.email}', '${user.password}', '${user.name}', '${user.tel}', '${user.token}', ${user.active});`;
    return db.save(sql);
}

exports.login = user => {
	var sql=`select * from users where email='${user.email}' and password='${user.password}';`;
	return db.load(sql);
}

exports.update = user => {
	var sql=`update users set name='${user.name}' where id=${user.id};`;
	return db.save(sql);
}

exports.updateToken = user => {
	var sql=`update users set token='${user.token}'where id=${user.id};`;
	return db.save(sql);
}

exports.updatePassword = user => {
	var sql=`update users set password='${user.password}' where id=${user.id};`;
	return db.save(sql);
}

exports.updateActive = user => {
	var sql=`update users set active = 1, token="" where id=${user.id};`;
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