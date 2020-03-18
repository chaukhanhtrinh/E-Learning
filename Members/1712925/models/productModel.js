const db = require('../utils/db');
const tbnNameProduct = 'products';

exports.productsHome = async (page = 0) => {
    const sql = `SELECT ProID,ProName,TinyDes,Price FROM ${tbnNameProduct}
                limit ${(page - 1) * 9},9;`;
    const row = await db.load(sql);
    return row;
};
exports.productsID = async (id, page = 1) => {
    const sql = `SELECT ProID,ProName,TinyDes,Price FROM ${tbnNameProduct}
                where CatID=${id}
                limit ${(page - 1) * 9},9;`;
    const row = await db.load(sql);
    return row;
};
exports.detailProID = async (id) => {
    const sql = `SELECT ProName,FullDes,Price,Quantity FROM ${tbnNameProduct}
                    where ProID=${id};`;
    const row = await db.load(sql);
    return row;
};

