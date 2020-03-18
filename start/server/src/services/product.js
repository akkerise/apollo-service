const product = require('../models/product');
const Base = require('./base');

class Product extends Base {
  constructor(){
    super(product);
    this.params = { ...this.params };
  }

  search(params) {
    const category = params.category || "";
    this.params = { ...this.params, ...params };
    return this.find()
  }
}

module.exports = Product;