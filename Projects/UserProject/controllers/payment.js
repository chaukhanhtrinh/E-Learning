const { default: Stripe } = require("stripe");

var stripe = require("stripe")("sk_test_MRlOBa2xxVhOOfbez5ieOODU00mFwFFh18")
if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config()
}
module.exports.charge = function(req,res){
    if(req.isAuthenticated())
	{
		if(!req.session.cart)
			res.redirect('/')
		const date = new Date().toISOString().slice(0, 19).replace('T', ' ');
		const cart = new Cart(req.session.cart);
		const products = cart.generateArray();
		const hoadontemp = {
					id: req.session.user.id,
					thanhtien: cart.totalPrice,
					ngaythanhtoan: date,
					name: req.param('name'),
					phonenumber: req.param('phonenumber'),
					email: req.param('email'),
					address: req.param('address')
		}
		//console.log(hoadontemp)
					HoaDon.add(hoadontemp).then(rows => {
					hoadontemp.mahoadon = rows.insertId;
					console.log(rows.insertId)
					for(let i=0; i<products.length;i++)
					{
						const giaodich = {
							makhoahoc: products[i].item.makhoahoc,
							soluong: products[i].qty,
							mahoadon: hoadontemp.mahoadon
						}
						GiaoDich.add(giaodich).then(rows => {})
						.catch(error => console.log(error.message))
					}
					//console.log("Đặt hàng thành công!")
					//res.redirect('/checkout')
					//	errors: errors})
				}).catch(error => console.log(error.message))
			}
		//}
		else
		res.redirect('/login')
var token = req.body.stripeToken;
		var chargeAmount = req.body.chargeAmount;
        stripe.customers.create({
            email:req.body.stripeEmail,
            source: req.body.stripeToken
        })
        .then(customer=>stripe.charges.create({
            amount: chargeAmount,
            description:'Payment courses',
            currency:'usd',
            customer:customer.id
        }))
        console.log("Đặt hàng thành công!")
		res.redirect('/confirmation')
      }