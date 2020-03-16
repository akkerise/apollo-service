const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/telio';
var ObjectId = require('mongoose').Types.ObjectId;

mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () =>
  console.log(`Connected to mongo at ${url}`)
);

const typeDefs = gql`
  type User {
    id: ID
    name: String
  }
  type Category {
    id: String
    title: String
    slug: String
    type: String
    icon: String
    children: [Category]
  }
  type Image {
    id: ID
    url: String
  }

  type Product {
    _id: String
    name: String
    reference_id: String
    EAN: String
    SKU: String
    description: String
    image: String
    brand: String
    type: String
    status: String
    gallery: [Image]
    variants: [String]
    quantity: Int
    categories: [Category]
    price: Int
    suggestedPurchasePrice: Int
    specialPrice: SpecialPrice
    city: String
    parentSKU: String
    suppliers: [Supplier]
    createdBy: User
    updatedBy: User
    createdAt: String
    updatedAt: String
  }
  type SpecialPrice {
    spPrice: String
    fromDate: String
    toDate: String
  }
  type Supplier {
    _id: String
    id: String
    name: String
    primarySupplier: String
    priorityNumber: Int
    sellingPrice: Int
  }
  type PaginatedProduct {
    docs: [Product]
    count: Int
    hasMore: Boolean
  }
  type PaginatedCategory {
    docs: [Category]
    count: Int
  }
  type Query {
    getUsers: [User]
    getProducts(
      keywords: String
      category: String
      offset: Int
      limit: Int
    ): PaginatedProduct
    getCategories(category: String, offset: Int, limit: Int): PaginatedCategory
    getDetailProduct(product_id: String): Product
    getDetailCategory(category: String): Category
  }
  type Mutation {
    addUser(userName: String!, email: String!): User
  }
`;

const { Schema, SchemaTypes } = mongoose;

const userSchema = new Schema({
  userName: String,
  email: String,
});

const User = mongoose.model('user', userSchema);

const productSchema = new Schema(
  {
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
  { timestamps: true }
);

const Product = mongoose.model('products', productSchema);

const categorySchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, index: { unique: true } },
    type: { type: String },
    icon: { type: String, required: true, index: { unique: true } },
    children: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

const Category = mongoose.model('categories', categorySchema);

const resolvers = {
  Query: {
    getUsers: async () => await User.find({}).exec(),
    getProducts: async (_, args) => {
      const items = await Product.find()
        .skip(args.offset)
        .limit(args.limit);
      return { docs: items, count: await Product.count({}), hasMore: true };
    },
    getDetailProduct: async (_, args) => {
      return Product.findOne({ _id: new ObjectId(args.product_id) });
    },
    getCategories: async (_, args) => {
      const categories = await Category.find()
        .skip(args.offset)
        .limit(args.limit);
      const util = require('util');

      const count = await Category.count({});
      return { docs: categories, count: count };
    },
    getDetailCategory: async (_, args) => {
      const category = await Category.findOne({
        slug: args.slug,
      });
    },
  },
  Mutation: {
    addUser: async (_, args) => {
      try {
        let response = await User.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
server.applyMiddleware({ app });

app.listen({ port: 4001 }, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
);
