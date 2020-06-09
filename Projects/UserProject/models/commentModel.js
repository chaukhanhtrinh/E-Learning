var db = require('../data/db');

exports.add = cmt => {
   	var sql = `insert into binhluan (makhoahoc, ten, binhluan, avatar) values('${cmt.makhoahocBL}','${cmt.tenBL}', '${cmt.binhluanBL}', '${cmt.avtBL}');`;
    return db.save(sql);
}