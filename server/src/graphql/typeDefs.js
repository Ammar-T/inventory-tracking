const gql = require("graphql-tag");

// Define all Query and Mutation Schemas
module.exports = gql`
  type Item {
    id: ID!
    name: String!
    type: String!
    manufacturer: String!
    warehouse: Warehouse!
    incoming: Int!
    quantity: Int!
  }
  type Warehouse {
    id: ID!
    name: String!
  }
  type Query {
    getItems: [Item]
    getWarehouses: [Warehouse]
  }
  type Mutation {
    createItem(
      name: String!
      type: String!
      manufacturer: String!
      warehouse: String!
      incoming: Int!
      quantity: Int!
    ): Item
    updateItem(
      id: String!
      name: String
      type: String
      manufacturer: String
      warehouse: String
      incoming: Int
      quantity: Int
    ): Item
    deleteItem(id: String!): String!

    createWarehouse(name: String!): Warehouse
  }
`;
