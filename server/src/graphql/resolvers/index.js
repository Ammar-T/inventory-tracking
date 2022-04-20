const itemResolvers = require("./items");
const warehouseResolvers = require("./warehouses");

module.exports = {
  Query: {
    ...itemResolvers.Query,
    ...warehouseResolvers.Query,
  },
  Mutation: {
    ...itemResolvers.Mutation,
    ...warehouseResolvers.Mutation,
  },
};
