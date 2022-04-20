import axios from "axios";
import {
  GET_WAREHOUSES_QUERY,
  CREATE_WAREHOUSE_MUTATION,
} from "../graphql/warehouse.defs";

axios.defaults.baseURL = "https://inventory-tracking.ammar-t.repl.co/graphql";

export const getWarehouses = () =>
  axios.post("/", {
    query: GET_WAREHOUSES_QUERY,
  });

export const createWarehouse = (warehouse) =>
  axios.post("/", {
    query: CREATE_WAREHOUSE_MUTATION,
    variables: warehouse,
  });

const warehouseAPI = {
  getWarehouses,
  createWarehouse,
};

export default warehouseAPI;
