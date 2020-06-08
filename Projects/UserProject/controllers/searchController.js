var dataconfig = require('../data/db');
var search = require('../models/searchModel');
var con = dataconfig.create;

module.exports.getCategory = async function(req,res, next)
{
	if(req.query.search){
		const {dataBrand, dataColor} = await search.PhanTach(req.query.search);
		var sql = "SELECT * FROM khoahoc";
		var brand = req.query.brand || dataBrand;
		var color = req.query.color || dataColor;
		var sortby = req.query.sortby || "none";
		var check = 0;
		if(brand != "none") 
		{
			sql = sql + " WHERE mon = '" + brand + "'";
			check = 1;
		}

		if(color != "none")
		{
			if(check == 0)
			{
				sql = sql + " WHERE giaovien = '" + color + "'";
			}
			else
			{
				sql = sql + " AND giaovien = '" + color + "'";
			}
		}

		if(sortby != "none")
		{
			if(sortby == "giagiam") sql = sql + " ORDER BY giamoi DESC";
			if(sortby == "giatang") sql = sql + " ORDER BY giamoi ASC";
			if(sortby == "soluongtang") sql = sql + " ORDER BY soluong ASC";
			if(sortby == "soluonggiam") sql = sql + " ORDER BY soluong DESC";
			if(sortby == "a-z") sql = sql + " ORDER BY tenkhoahoc ASC";
		}

		console.log(sql);

	    con.query(sql, function(err, results) {
		    if (err) res.end();
		    console.log(results);
		    var page = parseInt(req.query.page) || 1;
		    var numItem = 6;

		    var begin = (page - 1) * numItem;
		    var end = page * numItem;

		    if(req.isAuthenticated()){
		    	res.render("search",{data:results.slice(begin, end), curpage:page, brand:brand, color:color, sortby:sortby, search:req.query.search, user:req.user, logged: true  });
		    }else{
		    	res.render("search",{data:results.slice(begin, end), curpage:page, brand:brand, color:color, sortby:sortby, search:req.query.search, logged: false  });
		    }
		});
	}
};