const Warehouse = require("../models/Warehouse");
const mongoose = require("mongoose");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  getWarehouse: async (id) => {
    const warehouse = await Warehouse.findById(id);
    return warehouse;
  },
  getWarehouses: async () => {
    const warehouses = await Warehouse.find({});
    return warehouses;
  },
  createWarehouse: async (name) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const warehouse = new Warehouse({
        name,
      });
      const savedWarehouse = await warehouse.save();
      return savedWarehouse;
    } catch (err) {
      throw new ApolloError("Internal Error.");
    } finally {
      await session.endSession();
    }
  },
};
