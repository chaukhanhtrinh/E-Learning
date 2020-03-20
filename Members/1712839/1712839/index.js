var express = require('express');
var app = express();

// Setting for app here
// Set Public Folder
app.use(express.static(__dirname + '/public'));

//Use View engine
var expressHbs = require('express-handlebars');
var hbs = expressHbs.create({
	extname			: 'hbs',
	defaultLayout	: 'layout', 
	layoutsDir		: __dirname + '/views/layouts/',
	partialsDir		: __dirname + '/views/partials/',
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');




// Define your route here
var userRouter = require('./routes/users')
app.use('/users',userRouter);

var cartRouter = require('./routes/cart')
app.use('/cart',cartRouter);
 
var productsRouter = require('./routes/products')
app.use('/products',productsRouter);

var litBooksRouter = require('./routes/litBooks')
app.use('/litBooks',litBooksRouter);

var ecoBooksRouter = require('./routes/ecoBooks')
app.use('/ecoBooks',ecoBooksRouter);



app.get('/aboutme', function(req, res){
	res.render('aboutme');
});

app.get('/', function(req, res){
	res.redirect('products');
});


app.get('/error', function(req, res){
	res.render('error');
});


//Create database
 /* var models = require('./models');
app.get('/sync', function(req, res){
	models.sequelize.sync().then(function(){
		res.send('database sync completed!');
	});
});  */


// Set Server Port & Start Server
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function(){
	console.log('Server is listening at port ' + app.get('port'));
});