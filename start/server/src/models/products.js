const mongoose = require('mongoose')
const { Schema , SchemaTypes } = mongoose;

const schema = new Schema({
  _id: SchemaTypes.ObjectId,
  name: { type: String, required: true },
  reference_id: { type: String, required: true, index: { unique: true } },
  EAN: { type: String },
  SKU: { type: String, required: true, index: { unique: true } },
  description: { type: String },
  image: { type: String },
  city: { type: String },
  status: { type: String },
  type: { type: String },
  variants: [{ type: String }],
  categories: [{ type: String }],
  gallery: [
  {
    id: { type: String },
    url: { type: String },
  },
  ],
  price: { type: Number },
  quantity: { type: Number },
  brand: { type: String },
  suggestedPurchasePrice: { type: Number },
  specialPrice: {
    spPrice: { type: Number },
    fromDate: { type: String },
    toDate: { type: String },
  },
  parentSKU: { type: String },
  suppliers: [
  {
    _id: false,
    id: { type: SchemaTypes.ObjectId, required: true },
    name: { type: String, required: true },
    primarySupplier: { type: Boolean },
    priorityNumber: { type: Number },
    sellingPrice: { type: SchemaTypes.Decimal128 },
  },
  ],
  createdBy: {
    name: { type: String },
    id: { type: String },
  },
  updatedBy: {
    name: { type: String },
    id: { type: String },
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
},
{ timestamps: true });


module.exports = mongoose.model('product', schema); 