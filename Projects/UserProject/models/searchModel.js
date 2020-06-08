const db = require('../data/db');

exports.PhanTach = function(text)
{
    return new Promise(function(resolve, reject) {
       var dataBrand = "none";
		var dataColor = "none";
		const tokens = text.split(" ");

		db.create.query("SELECT * FROM khoahoc", function(err, results) {
			    if (err) reject(err);
			    tokens.forEach(token => {
			    	console.log(token);
			    	results.forEach(item => {
			    		if(token.toUpperCase() === item.giaovien && dataColor === "none"){
			    			console.log(item.giaovien);
			    			dataColor = item.giaovien;
			    		}
			    		if(token.toUpperCase() === item.mon && dataBrand === "none")
			    		{
			    			console.log(item.mon);
			    			dataBrand = item.mon;
			    			console.log(dataBrand);
			    		}
			    	})});
			    resolve({dataBrand, dataColor});
			})
		});
}