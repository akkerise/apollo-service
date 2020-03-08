const mongoose = require('mongoose')
const { Schema } = mongoose;

const productSchema = new Schema({
  title: String,
  gallery: Array,
  priceText: String,
  price: Number,
  salePrice: Number,
  discountInPercent: Number,
  type: String,
  slug: String,
  description: String,
  categories: Array,
  page: Number,
});

const Product = mongoose.model('product', productSchema); 

module.exports = Product