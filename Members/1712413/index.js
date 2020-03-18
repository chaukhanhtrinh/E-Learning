let express = require ('express');
let app = express();


app.use(express.static(__dirname+'/static'));
let expressHbs = require('express-handlebars');
let hbs = expressHbs.create({
    extname: 'hbs',
    defaultLayout:'layout',
    layoutsDir: __dirname+ '/views/layouts/',
    partialsDir:__dirname+ '/views/partials'
});
app.engine ('hbs',hbs.engine);
app.set('view engine','hbs');


app.get('/',(req, res)=>{
    res.render('index');
});
app.get('/thongtinnhom',(req, res)=>{
    res.render('thongtinnhom');
});
app.get('/sync',(req, res)=>{
    let models= require('./models');
    models.sequelize.sync()
    .then(()=>{
        res.send('database sync completed!')
    });
});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'),()=> {
    console.log(`Server is running at port ${app.get('port')}`);
});