var express = require('express');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var exphbsSections = require('express-handlebars-sections');
var path = require('path');
var request=require('request');

var ssesion= require('express-session');
var passport=require('passport');
var flash=require('connect-flash');
var validator=require('express-validator');
//utils
var settings=require('./utils/settings');
//controller
var detailProModel=require('./controllers/detailCtrL')
var categories = require('./controllers/categoryCtrL');
//model
var categoryModel = require('./models/categoryModel.js');
var productModel = require('./models/productModel');
var Handlebars = require('handlebars');
var app = express();
const hbs=exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});
exphbsSections(hbs);
app.engine('hbs',hbs.engine);
app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(ssesion({
  secret: 'whRAA968dAWPkIsU14UjojvtRNPbk6hK',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.body.email;
  //res.locals.authenticated = !req.user.anonymous
  next()
})


app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + '/views');
//contrller của trang chi tiết
app.use('/product',detailProModel);
// Controller của trang category
app.use('/cat', categories);
//
// controller của trang home
app.get('/', async (req, res) => {
  
  res.render('home');

});
app.get('/category/page=:page', async (req, res) => {
  // xử lý phân trang
  const page = parseInt(req.params.page);

  const loopFor = {page: page, link: "/category" };// dữ liệu phân trang
  const menuside = await categoryModel.category();            // dữ liệu category
  const contentSide = await productModel.productsHome(page);  // dữ liệu product
  console.log(loopFor);
  // 

  res.render('category', {
    dataMenu: menuside,
    dataContenSide: contentSide,
    pagination: loopFor
  })
});

app.get('/category', async (req, res) => {
  const menuside = await categoryModel.category();
  const contentSide = await productModel.productsHome(1);

  const loopFor = { from: 1, page: 1, link: "/category" };// dữ liệu phân trang
  res.render('category', {
    dataMenu: menuside,
    dataContenSide: contentSide,
    pagination: loopFor
  })

});



// tạo vòng lặp for
Handlebars.registerHelper('for', function (from, to, block) {
  var accum = '';
  for (var i = from; i < to; i++)
    accum += block.fn(i);
  return accum;
});
Handlebars.registerHelper('incPage', (value, option) => {
  return parseInt(value) + 1;
});
Handlebars.registerHelper('decrPage', (value, option) => {
  return parseInt(value) - 1 > 0 ?  parseInt(value) - 1:1;
});
Handlebars.registerHelper('MakePagin',(page,link ,option)=>{
  let prev;
  if (page % 3 === 0) {
    prev = page - 2;
  } else {
    prev = parseInt(page / 3) * 3 + 1;
  }
  var output='';
  let a;
  for(let i=prev;i<prev+3;i++){
    output+=`<li class="page-item ${i===page?'active':''}"><a class="page-link" href="${link}/page=${i} ">${i}</a></li>`;
    a=1;
  }
  console.log(a);
  return output;
})

// khởi tạo server
var server = app.listen(3000, () => {
  var port = server.address().port;

  console.log(`Example app listening at ${port}`);
})

