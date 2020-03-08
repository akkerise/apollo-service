const Product = require('./models/products.js')

const resolvers = {
  Query: {
    getProducts: async ($slug='', $type = 'gocery') => await Product.find({$slug,$type}).exec()
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        let response = await Product.create(args);
        return response;
      } catch(e) {
        return e.message;
      }
    }
  }
}
module.exports = resolvers