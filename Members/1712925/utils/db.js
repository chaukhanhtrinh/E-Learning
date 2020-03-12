var mysql = require('mysql');

var connection =()=> {
  return  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vuong310',
    database: 'ql_banhang'
  });
}

exports.load = (sql) => {
  return new Promise((resole, reject) => {
    const con = connection();
    con.connect((err) => {
      if (err) {
        reject(err);
      }
    });
    con.query(sql, (err, result, fields) => {
      if (err) {
        reject(err);
      }
      resole(result);
    });
    con.end();
  });
};

