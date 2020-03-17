const mongoose = require('mongoose')
const { Schema, SchemaTypes } = mongoose;

const schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, index: { unique: true } },
    type: { type: String },
    icon: { type: String, required: true, index: { unique: true } },
    children: { type: Schema.Types.Mixed },
    products: [{type: Schema.Types.ObjectId, ref: 'product'}],
  },
  { timestamps: true }
);

module.exports = mongoose.model('category', schema)
