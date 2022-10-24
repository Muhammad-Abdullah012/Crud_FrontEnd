import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from "./Constants";

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const deleteItem = (key) => {
  return {
    type: DELETE_ITEM,
    payload: key,
  };
};

export const editItem = (item) => {
  return {
    type: EDIT_ITEM,
    payload: item,
  };
};

