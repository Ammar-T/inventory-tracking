const { UserInputError } = require("apollo-server-express");
const warehouseRepository = require("../../repository/dalWarehouse");

module.exports = {
  Query: {
    getWarehouses: async (_, _args, _context) => {
      const warehouses = await warehouseRepository.getWarehouses();
      return warehouses;
    },
  },
  Mutation: {
    createWarehouse: async (_, { name }, _context) => {
      if (!name) {
        throw new UserInputError("Missing name.");
      }

      const warehouse = await warehouseRepository.createWarehouse(name);
      return warehouse;
    },
  },
};
