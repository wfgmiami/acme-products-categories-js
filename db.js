const categories = [];
//you're better off doing module.exports = {
//  categories,
//  getCategories
//};
module.exports.categories = categories;//what is the purpose of exporting this? you already have getCategories

module.exports.getCategories = function getCategories(){
  return categories;
}

module.exports.getCategory = (id)=>{
  return categories.filter( cat => cat.id === id*1)[0];
}

module.exports.insertCategory = (category)=>{
  category.id = nextId();
  categories.push(category);
}


module.exports.insertProduct = (product,catId)=>{
  var index = getIndex(catId);
  product.id = nextId(index);

  if (Object.keys(categories[index]).indexOf('products') > -1){
    categories[index].products.push(product);
  }
  else{
    categories[index].products = [product];
  }
}

module.exports.deleteProduct = (catId, prodId)=>{
  const index = getIndex(catId);
  const prodIndex = getIndex(catId, index, prodId);
  categories[index].products.splice(prodIndex,1);
}

module.exports.deleteCategory = (id)=>{
  const index = getIndex(id);
  categories.splice(index,1);
}

function nextId(index){
  //having a hard time following this
  //I don't think this needs to be so complex.. take a look at solution repo
  var catArray = [];
  if (arguments.length > 0){

    if (Object.keys(categories[index]).indexOf('products') > -1){
      var catArray = categories[index].products;
    }
  }else{
    var catArray = categories;//isn't catArray defined?
  }
  var max = catArray.reduce((max, cat)=> {
    if (cat.id > max){
      max = cat.id;
    }
    return max;
  },0)
  return ++max;
}

function getIndex(catId, catIndex, prodId){
  var index = 0;
  var catArray = [];
  if (arguments.length === 3){
    catArray = categories[catIndex].products;
    testId = prodId;
  }else{
    catArray = categories;
    testId = catId;
  }
  catArray.forEach((cat,ind) => {
    if (cat.id === testId)
      index = ind;
  })
  return index;
}

