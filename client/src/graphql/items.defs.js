export const GET_ITEMS_QUERY = `
  query Query {
    getItems {
      id
      name
      type
      manufacturer
      warehouse {
        id
        name
      }
      incoming
      quantity
    }
  }
`;

export const CREATE_ITEM_MUTATION = `
  mutation CreateItem($name: String!, $type: String!, $manufacturer: String!, $warehouse: String!, $incoming: Int!, $quantity: Int!) {
    createItem(name: $name, type: $type, manufacturer: $manufacturer, warehouse: $warehouse, incoming: $incoming, quantity: $quantity) {
      name
      type
      id
      manufacturer
      warehouse {
        id
        name
      }
      incoming
      quantity
    }
  }
`;

export const UPDATE_ITEM_MUTATION = `
  mutation UpdateItem($id: String!, $name: String, $type: String, $manufacturer: String, $warehouse: String, $incoming: Int, $quantity: Int) {
    updateItem(id: $id, name: $name, type: $type, manufacturer: $manufacturer, warehouse: $warehouse, incoming: $incoming, quantity: $quantity) {
      id
      name
      manufacturer
      type
      warehouse {
        id
        name
      }
      incoming
      quantity
    }
  }
`;

export const DELETE_ITEM_MUTATION = `
  mutation DeleteItem($id: String!) {
    deleteItem(id: $id)
  }
`;
