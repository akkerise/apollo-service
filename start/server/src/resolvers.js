const Product = require('./models/products.js'),
  User = require('./models/user.js'),
  Category = require('./models/category.js');

const resolvers = {
  Query: {
    getProducts: async (_, {keyword, category, offset, limit}) => {
      const products = await Product.find({
        $or: [
          {
            name: {$regex: keyword, $options: 'i'}
          }
        ],
      })
        .where({category})
        .skip(offset)
        .limit(limit);
      const count = products.length;
      const hasMore = products.length ? true : false;
      return {products, count, hasMore};
    },
    getUsers: async (_, {keyword, category, offset, limit}) => {
      const users = await User.find().skip(offset).limit(limit);
      const count = await User.count({});
      const hasMore = users.length ? true : false;
      return {users, count, hasMore}
    },
    getCategories: async (_, args) => {
    
    },
    getProductDetail: async (_, {_id}) => {
      return await Product
        .findOne({_id})
        .populate('category')
        .exec();
    }
  },
  Mutation: {
    addProduct: async (_, args) => {
      try {
        let response = await Product.create(args);
        return response;
      } catch (e) {
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
module.exports = resolvers;
