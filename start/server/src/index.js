const connect = require('connect');
const { ApolloServer, gql } = require('apollo-server-express');
const query = require('qs-middleware');
const resolvers = require('./resolvers.js')
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/telio';

const typeDefs = gql`
  type Product {
    id: ID!
    title: String!,
    gallery: [String],
    priceText: String,
    price: Int,
    salePrice: Int,
    discountInPercent: Int,
    type: String,
    slug: String,
    description: String,
    categories: [Category],
    page: Int
  }

  type Category {
    title: String,
    slug: String,
  }

  type Query {
    getProducts: [Product]
  }

  type Mutation {
    addProduct(name: String!): Product
  }
`;
const server = new ApolloServer({ typeDefs, resolvers });
const app = connect();
const path = `/telio/graphql`
app.use(query());
server.applyMiddleware({ app, path });
mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => console.log(`🚀 Connected to mongo at ${url}`));
app.listen({ port: 4004 }, () =>
  console.log(`🚀 Server ready at http://localhost:4004${server.graphqlPath}`)
);