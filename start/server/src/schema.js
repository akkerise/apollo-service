const {gql} = require('apollo-server')
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
        createdAt: String
        updatedAt: String
    }
    type Category {
        _id: ID
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
        category: Category
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
        _id: ID
        name: String
        primarySupplier: String
        priorityNumber: Int
        sellingPrice: Int
    }
    type ProductResponse {
        products: [Product]
        count: Int
        hasMore: Boolean
    }
    type CategoryResponse {
        categories: [Category]
        count: Int
    }
    type UserResponse {
        users: [User]
        count: Int
        hasMore: Boolean
    }
    type Query {
        getUsers(keyword: String, category: String, offset: Int, limit: Int): UserResponse
        getProducts(keyword: String, category: String, offset: Int, limit: Int): ProductResponse
        getCategories(category: String, offset: Int, limit: Int): CategoryResponse
        getProductDetail(_id: String): Product
        getCategoryDetail(_id: String): Category
    }
    type Mutation {
        addProduct(name: String!): Product
        addUser(username: String!, email:   String!, password: String!): User
    }
`;
module.exports = typeDefs;
