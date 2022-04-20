export const GET_WAREHOUSES_QUERY = `
  query Query {
    getWarehouses {
      id
      name
    }
  }
`;

export const CREATE_WAREHOUSE_MUTATION = `
  mutation CreateWarehouse($name: String!) {
    createWarehouse(name: $name) {
      id
      name
    }
  }
`;
