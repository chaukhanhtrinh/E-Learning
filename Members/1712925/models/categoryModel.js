const db = require('../utils/db');
const tbnNameCategory = 'categories';
const tbnNameProduct = 'products';

exports.category=async()=>{
    const sql = `SELECT * FROM ${tbnNameCategory}`;
    const row =await db.load(sql);
    return row;
};
