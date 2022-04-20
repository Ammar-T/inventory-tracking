import axios from "axios";
import {
  GET_ITEMS_QUERY,
  CREATE_ITEM_MUTATION,
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
} from "../graphql/items.defs";

axios.defaults.baseURL = "https://inventory-tracking.ammar-t.repl.co/graphql";

export const getItems = () =>
  axios.post("/", {
    query: GET_ITEMS_QUERY,
  });

export const createItem = (item) =>
  axios.post("/", {
    query: CREATE_ITEM_MUTATION,
    variables: item,
  });

export const updateItem = (item) =>
  axios.post("/", {
    query: UPDATE_ITEM_MUTATION,
    variables: item,
  });

export const deleteItem = (item) =>
  axios.post("/", {
    query: DELETE_ITEM_MUTATION,
    variables: item,
  });

const itemsAPI = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
};

export default itemsAPI;
