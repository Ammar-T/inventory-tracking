const Item = require("../models/Item");
const mongoose = require("mongoose");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  getItems: async () => {
    const items = await Item.find({});
    return items;
  },
  createItem: async (
    name,
    type,
    manufacturer,
    warehouse,
    incoming,
    quantity
  ) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const item = new Item({
        name,
        type,
        manufacturer,
        warehouse,
        incoming,
        quantity,
      });
      const savedItem = await item.save();
      return savedItem;
    } catch (err) {
      throw new ApolloError("Internal Error.");
    } finally {
      await session.endSession();
    }
  },
  updateItem: async (id, item) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const updatedItem = await Item.findByIdAndUpdate(id, item);
      return updatedItem;
    } catch (err) {
      throw new ApolloError("Internal Error.");
    } finally {
      await session.endSession();
    }
  },
  deleteItem: async (id) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const deleteRes = await Item.findByIdAndDelete(id);
      return deleteRes;
    } catch (err) {
      throw new ApolloError("Internal Error.");
    } finally {
      await session.endSession();
    }
  },
};
