var mysql = require('mysql');

module.exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: "db4free.net",
		    port: "3306",
		    user: "nhomecb02",
		    password: "nhom123456789",
            database: "webcourseb02"
		});

        cn.connect();

        cn.query(sql, function(error, rows, fields) {
            if (error) {
                reject(error);
            } else {
                resolve(rows);
            }

            cn.end();
        });
    });
}

module.exports.save = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: "db4free.net",
		    port: "3306",
		    user: "nhomecb02",
		    password: "nhom123456789",
            database: "webcourseb02"
		});

        cn.connect();

        cn.query(sql, function(error, value) {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }

            cn.end();
        });
    });
}

var cn = mysql.createConnection({
    host: "db4free.net",
    port: "3306",
    user: "nhomecb02",
    password: "nhom123456789",
    database: "webcourseb02"
	});
module.exports.create = cn;
