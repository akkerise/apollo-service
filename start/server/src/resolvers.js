const Product = require('./models/products.js')
const User = require('./models/user.js')

const resolvers = {
  Query: {
    getProducts: async (_, args) => {
      const products = await Product.find().skip(args.offset).limit(args.limit);
      const count = await Product.count({});
      const hasMore = products.length ? true : false;
      return { products, count, hasMore };
    },
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        let response = await Product.create(args);
        return response;
      } catch(e) {
        return e.message;
      }
    },
    addUser: async (_, args) => {
      try {
        let response = await User.create(args);
        return response;
      } catch (e) {
        return e.message;
      }
    },
  }
}
module.exports = resolvers