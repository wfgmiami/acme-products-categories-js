const router = require('express').Router();
const db = require('../db');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded( { extended: false }));

router.get('/', (req,res,next)=>{
  var len = db.getCategories().length;
  if (len !== 0){
    var id = db.getCategories()[len - 1].id;
  }
  res.render('categories', {nav:'cats',numCats:len, id: id, cats: db.getCategories() });
})

router.get('/:id', (req,res,next)=>{
  var id = req.params.id*1;
  var len = db.getCategories().length;
  //console.log(db.getCategories(id));
  res.render('category', { nav:'cats',numCats:len, id: id,cats: db.getCategories(), category: db.getCategory(id) });
})

router.post('/:id/products', (req, res, next)=>{
  var id = req.params.id*1;
  db.insertProduct(req.body,id);
  res.redirect('/categories/' + id);
})

router.post('/', (req,res,next)=>{
  db.insertCategory(req.body);
  var len = db.getCategories().length;
  var id = db.getCategories()[len - 1].id;
  res.redirect('/categories/' + id);
})

router.delete('/:id', (req,res)=>{
  db.deleteCategory(req.params.id*1);
  res.redirect('/categories');
})

router.delete('/:catId/products/:id', (req,res)=>{
  var catId = req.params.catId*1;
  db.deleteProduct(catId, req.params.id*1);
  res.redirect('/categories/' + catId);
})

module.exports = router;
