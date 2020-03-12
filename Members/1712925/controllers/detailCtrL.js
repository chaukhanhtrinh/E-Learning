var express = require('express');
var router = express.Router();
const productModel = require('../models/productModel')

router.get('/:id/detail',async (req, res) => {
    const id = parseInt(req.params.id);
    const infor = await productModel.detailProID(id).catch((err) => console.log('caught it'));
    console.log({ proID: id, inFor: infor } );
    res.render('detail', { proID: id, inFor: infor });
});
module.exports = router;