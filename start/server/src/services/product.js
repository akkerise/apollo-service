const product = require('../models/product');
const Base = require('./base');

class Product extends Base {
  constructor(){
    super(product)
  }
  find(params){
    const {category} = params;
    this.params = {...params}
  }
}

module.exports = Product;