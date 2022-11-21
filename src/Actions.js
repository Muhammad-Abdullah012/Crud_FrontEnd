import axios from "axios";
import { notification } from "antd";
import {
  ADD_ITEM,
  DELETE_ITEM,
  EDIT_ITEM,
  INITIALIZE_STATE,
  FILTERED_DATA,
  LOADING_DATA,
  DATA_LOADED,
  BASE_URL,
  INITIALIZE_ORGANIZATIONS,
  ADD_ORGANIZATION,
  USERS_PATH,
  ORGANIZATIONS_PATH,
  EDIT_ORGANIZATION,
  DELETE_ORGANIZATION,
  INITIALIZE_ORDERS,
  ORDERS_PATH,
  EDIT_ORDER,
  DELETE_ORDER,
  ADD_ORDER,
} from "./Constants";

export const openNotification = (type, title, desc) => {
  notification[type]({
    message: title,
    description: desc,
    duration: 1.5,
  });
};

export const setDataSource = (arr) => {
  return {
    type: INITIALIZE_STATE,
    payload: arr,
  };
};
export const setOrganizations = (arr) => {
  return {
    type: INITIALIZE_ORGANIZATIONS,
    payload: arr,
  };
};
export const setOrders = (arr) => {
  return {
    type: INITIALIZE_ORDERS,
    payload: arr,
  };
};

export const sendDataAction = async (data, dispatch, path) => {
  await axios
    .post(`${BASE_URL}${path}`, data)
    .then((res) => {
      openNotification(
        "success",
        "Record Added",
        "Record was added successfully"
      );
      const data = { ...res.data };
      data.key = data.id;
      switch (path) {
        case USERS_PATH:
          dispatch(addItem(data));
          break;
        case ORGANIZATIONS_PATH:
          dispatch(addOrg(data));
          break;
        case ORDERS_PATH:
          dispatch(addOrder(data));
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      openNotification(
        "error",
        "Error Occured",
        "An Error occured while creating user!"
      );
      console.error(err);
    });
};

export const getDataById = async (id, path) => {
  return await axios
    .get(`${BASE_URL}${path}/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      openNotification(
        "error",
        "Error Occured",
        "An Error occured while fetching data!"
      );
      console.error(err);
    });
};

export const sendEditedDataAction = async (data, dispatch, path) => {
  await axios
    .put(`${BASE_URL}${path}`, data)
    .then(async (res) => {
      openNotification(
        "success",
        "Record Edited",
        "Record was edited successfully"
      );
      const returnedData = { ...res.data };
      returnedData.key = returnedData.id;
      console.log("Data returned after editAction: ", res.data);
      switch (path) {
        case USERS_PATH:
          dispatch(editItem(returnedData));
          break;
        case ORGANIZATIONS_PATH:
          dispatch(editOrg(returnedData));
          break;
        case ORDERS_PATH:
          dispatch(editOrder(returnedData));
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      openNotification(
        "error",
        "Error Occured",
        "An Error occured while editing!"
      );
      console.error(err);
    });
};

export const sendDeleteDataRequest = async (id, dispatch, path) => {
  await axios
    .delete(`${BASE_URL}${path}/${id}`)
    .then((res) => {
      openNotification(
        "success",
        "Record Deleted",
        "Record was deleted successfully"
      );
      switch (path) {
        case USERS_PATH:
          dispatch(deleteOrg(id));
          break;
        case ORGANIZATIONS_PATH:
          dispatch(deleteOrg(id));
          break;
        case ORDERS_PATH:
          dispatch(deleteOrder(id));
          break;
        default:
          break;
      }
    })
    .catch((err) => {
      openNotification(
        "error",
        "Error Occured",
        "An Error occured while deleting!"
      );
      console.error(err);
    });
};

export const addItem = (item) => {
  return {
    type: ADD_ITEM,
    payload: item,
  };
};

export const addOrg = (org) => {
  return {
    type: ADD_ORGANIZATION,
    payload: org,
  };
};

export const addOrder = (order) => {
  return {
    type: ADD_ORDER,
    payload: order,
  };
};

export const deleteItem = (id) => {
  return {
    type: DELETE_ITEM,
    payload: id,
  };
};
export const deleteOrg = (id) => {
  return {
    type: DELETE_ORGANIZATION,
    payload: id,
  };
};
export const deleteOrder = (id) => {
  return {
    type: DELETE_ORDER,
    payload: id,
  };
};

export const editItem = (item) => {
  return {
    type: EDIT_ITEM,
    payload: item,
  };
};
export const editOrg = (org) => {
  return {
    type: EDIT_ORGANIZATION,
    payload: org,
  };
};
export const editOrder = (order) => {
  return {
    type: EDIT_ORDER,
    payload: order,
  };
};

export const loadingData = () => {
  return {
    type: LOADING_DATA,
  };
};

export const dataLoaded = () => {
  return {
    type: DATA_LOADED,
  };
};

export const filterData = (data) => {
  return {
    type: FILTERED_DATA,
    payload: data,
  };
};
