var mysql = require('mysql');

module.exports.load = sql => {
    return new Promise((resolve, reject) => {
        var cn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "vuong310",
            database: "webcourse"
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
            host: "localhost",
            user: "root",
            password: "vuong310",
            database: "webcourse"
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

// var cn = mysql.createConnection({
            // host: "localhost",
            // port: "3306",
            // user: "root",
            // password: "",
            // database: "shopshoe"
            
// 		    host: "db4free.net",
// 		    port: "3306",
// 		    user: "nodejsacc1",
// 		    password: "passwordne123",
// 		    database: "shopshoe"
// 		});
// module.exports.create = cn;