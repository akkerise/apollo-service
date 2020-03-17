const category = require('../models/category')
Base = require('../services/base');

class Category extends Base {
  constructor(){
    super(category);
  }

}

module.exports = Category;