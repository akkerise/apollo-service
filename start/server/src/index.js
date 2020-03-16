const connect = require('connect');
const consola = require('consola');
const { ApolloServer, gql } = require('apollo-server-express');
const query = require('qs-middleware');
const resolvers = require('./resolvers.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const url = 'mongodb://localhost:27017/telio';
const typeDefs = require('./schema.js');
const server = new ApolloServer({ typeDefs, resolvers });
const app = connect();
const path = `/telio/graphql`
app.use(query());
server.applyMiddleware({ app, path });
mongoose.connect(url, { useNewUrlParser: true });
mongoose.connection.once('open', () => consola.success(`🚀 Connected to mongo at ${url}`));
app.listen({ port: 4004 }, () => consola.success(`🚀 Server ready at http://localhost:4004${server.graphqlPath}`));
