const categories = [];

module.exports.categories = categories;

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
  var catArray = [];
  if (arguments.length > 0){

    if (Object.keys(categories[index]).indexOf('products') > -1){
      var catArray = categories[index].products;
    }
  }else{
    var catArray = categories;
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

