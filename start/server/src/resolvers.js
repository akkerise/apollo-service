const ProductService = require('./services/product.js'),
  User = require('./services/user.js'),
  Category = require('./services/category.js');

const resolvers = {
  Query: {
    getProducts: async (_, params, {dataSources}) => {
      // const products = await Product.find({
      //   $or: [
      //     {
      //       name: {$regex: keyword, $options: 'i'}
      //     }
      //   ],
      // })
      //   // .where({category})
      //   .skip(offset)
      //   .limit(limit);
      // const count = products.length;
      // const hasMore = products.length ? true : false;
      const products = await dataSources.product.find(params);
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
    getCategories: async (_, {keyword, category, offset, limit}) => {
      const categories = await Category.find().skip(offset).limit(limit);
      const count = await Category.count({});
      const hasMore = categories.length ? true : false;
      return {categories, count, hasMore}
    },
    getProductDetail: async (_, {_id}) => {
      const product = await Product
        .findOne({_id})
        .populate('category')
        .exec(function (err, category) {
          if (err) return handleError(err);
          return category;
        });
        return product
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
