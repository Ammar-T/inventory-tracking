const { UserInputError } = require("apollo-server-express");
const itemRepository = require("../../repository/dalItem");
const warehouseRepository = require("../../repository/dalWarehouse");

const getWarehouseInfo = async (item) => {
  const warehouse = await warehouseRepository.getWarehouse(item.warehouse);

  return {
    id: item.id,
    name: item.name,
    type: item.type,
    manufacturer: item.manufacturer,
    warehouse: warehouse,
    incoming: item.incoming,
    quantity: item.quantity,
  };
};

const getMultipleWarehousesInfo = async (items) => {
  const itemsWithWares = await Promise.all(
    items.map((item) => getWarehouseInfo(item))
  );
  return itemsWithWares;
};

module.exports = {
  Query: {
    getItems: async (_, _args, _context) => {
      const items = await itemRepository.getItems();
      const itemsWithWares = await getMultipleWarehousesInfo(items);

      return itemsWithWares;
    },
  },
  Mutation: {
    createItem: async (
      _,
      { name, type, manufacturer, warehouse, incoming, quantity },
      _context
    ) => {
      if (
        !name ||
        !type ||
        !manufacturer ||
        !warehouse ||
        !incoming ||
        !quantity
      ) {
        throw new UserInputError("Missing fields.");
      }

      const item = await itemRepository.createItem(
        name,
        type,
        manufacturer,
        warehouse,
        incoming,
        quantity
      );
      const itemWithWarehouse = await getWarehouseInfo(item);
      return itemWithWarehouse;
    },
    updateItem: async (_, item, _context) => {
      const { id, name, type, manufacturer, warehouse, incoming, quantity } =
        item;

      if (!id) {
        throw new UserInputError("Missing required field from request!");
      }

      const updatedItem = { id: id };

      if (name) {
        updatedItem.name = name;
      }
      if (type) {
        updatedItem.type = type;
      }
      if (manufacturer) {
        updatedItem.manufacturer = manufacturer;
      }
      if (warehouse) {
        updatedItem.warehouse = warehouse;
      }
      if (incoming) {
        updatedItem.incoming = incoming;
      }
      if (quantity) {
        updatedItem.quantity = quantity;
      }

      await itemRepository.updateItem(id, updatedItem);

      return await getWarehouseInfo(updatedItem);
    },
    deleteItem: async (_, { id }, _context) => {
      if (!id) {
        throw new UserInputError("Missing required field from request!");
      }

      await itemRepository.deleteItem(id);
      return "Deleted post successfully!";
    },
  },
};
