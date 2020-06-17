const hoadon = require('../models/hoadonModel');
const thongke = require('../models/thongke')

module.exports.getQuanLyDonHang = function(req, res, next) {
	hoadon.loadAll().then(rows =>{
		res.render('quan_ly_don_hang', {  action: "Quản lý đơn hàng", user:req.session.user, bills: rows });	
	})
}

module.exports.getNotDeli = function(req, res){
	hoadon.checkInNotDeliveryYet(req.params.id).then(result =>{
		if (result.affectedRows)
			res.redirect('/quan_ly_don_hang');
	})
}

module.exports.getDelivering = function(req, res){
	hoadon.checkInDelivering(req.params.id).then(result =>{
		if (result.affectedRows)
			res.redirect('/quan_ly_don_hang');
	})
}

module.exports.getDeliveried = function(req, res){
	hoadon.checkInDelivery(req.params.id).then(result =>{
		if (result.affectedRows)
			res.redirect('/quan_ly_don_hang');
	})
}

module.exports.getThongKe = function(req, res, next) {
	hoadon.cashByDay().then(result1 =>{
		hoadon.cashByWeek().then(result2 =>{
			hoadon.cashByMonth().then(result3 =>{
				hoadon.cashByQuarter().then(result4 =>{
					hoadon.cashByYear().then(result5 =>{
						thongke.top10().then(rows1 =>{
							thongke.top10Brand().then(rows2 =>{
								res.render('thong_ke', { action: "Thống kê", user:req.session.user, products: rows1, brands: rows2, perday: result1, perweek: result2, permonth: result3, perquarter: result4, peryear: result5});	
							})
						})
					})
				})
			})
		})
	})
}