var express = require('express');
var categoryModel = require('../models/categoryModel.js');
var productModel = require('../models/productModel.js');
var router = express.Router();

router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    let loopFor = {page: 1,link:'/cat/'+id};
    const menuside = await categoryModel.category().catch((err) => console.log('caught it'));;
    for (const item of menuside) {
        if (item.CatID === id) {
            item.isActive = true;
        } else item.isActive = false;
    }
    const productsID = await productModel.productsID(id).catch((err) => console.log('caught it'));
    res.render('category', {
        dataMenu: menuside,
        dataContenSide: productsID,
        pagination: loopFor
    });
});
router.get('/:id/page=:page', async (req, res) => {
    const id = parseInt(req.params.id);
    const page = parseInt(req.params.page);
    console.log(page);
    const loopFor = {page: page, link: '/cat/' + id };// dữ liệu phân trang
    const menuside = await categoryModel.category().catch((err) => console.log('caught it'));;
    for (const item of menuside) {
        if (item.CatID === id) {
            item.isActive = true;
        } else item.isActive = false;
    }
    const productsID = await productModel.productsID(id, page).catch((err) => console.log('caught it'));;
    res.render('category', {
        dataMenu: menuside,
        dataContenSide: productsID,
        pagination: loopFor
    });
});



module.exports = router;