let express = require('express');
let app=express();

//set public static folder
app.use(express.static(__dirname + '/public'));


var exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: __dirname+'/views/layouts/',
    partialsDir: __dirname+'/views/partials/'
}));
app.set('view engine', 'handlebars');

//define routes here
app.get('/', (req, res) => {
    res.render('index');
});


app.get('/sync', (req,res)  => {
    let models = require('./models');
    models.sequelize.sync()
    .then(() =>{
        res.send('database sync completed')
    });
});



app.get('/:page', (req, res) => {
    let banner = {
      blog:'Our Blog',
      category:'Shop category',
      cart:'Shopping Cart',
      checkout:'Product Checkout',
      confirmation:'Order Confirmation',
      index:'Nguyễn Minh Trí',
      login:'Login / Register',
      register:'Register',
      single_blog: 'Blog Detail',
      single_product: 'Shop Single',
      tracking_order: 'Order Tracking',

    };
    let page = req.params.page;
    res.render(page, { banner: banner[page]});
});





/*
set server port start server
*/
app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'),  () => {
   console.log(`Server is running at port ${app.get('port')}`);

});
