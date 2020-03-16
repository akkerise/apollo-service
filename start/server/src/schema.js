const { gql } = require('apollo-server')
const typeDefs = gql`
  type User {
    _id: String
    username: String
    email: String
    password: String
  }
  type Category {
    _id: String
    title: String
    slug: String
    type: String
    icon: String
    children: [Category]
  }
  type Image {
    _id: ID
    url: String
  }

  type Product {
    _id: ID
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
    name: String
    primarySupplier: String
    priorityNumber: Int
    sellingPrice: Int
  }
  type PaginatedProduct {
    products: [Product]
    count: Int
    hasMore: Boolean
  }
  type PaginatedCategory {
    categories: [Category]
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
    getDetailCategory(category: String): Category,
  }
  type Mutation {
    addProduct(name: String!): Product
    addUser(username: String!, email: String!, password: String!): User
  }
`;
module.exports = typeDefs;