const express = require('express');
const app = express();
const swig = require('swig');
const db = require('./db');
const sqlite = require('sqlite3');
const methodOverride = require('method-override');

//const db = new sqlite.Database('./acme');

app.set('view engine', 'html');
app.engine('html', swig.renderFile);
swig.setDefaults( {cache: false } );

app.use('/vendors', express.static(__dirname + '/node_modules/'))
app.use(methodOverride('_method'));

app.get('/', (req, res, next)=>{
    var catsPre = JSON.stringify(db.getCategories(),null,2);
  res.render('index', {
    nav: 'home',
    numCats:db.getCategories().length,
    cats: db.getCategories(),//do you need all the categories on the home page
    catsPre: catsPre
    })
});

app.use('/categories', require('./routes/categories'));

const port = process.env.PORT || 3000;

app.listen(port, ()=>{
  console.log(`Listening on port ${ port }`);
})
