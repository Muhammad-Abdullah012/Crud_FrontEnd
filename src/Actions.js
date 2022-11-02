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

export const sendDataAction = async (data, dispatch) => {
  await axios
    .post("http://localhost:8000/raw/user", data)
    .then((res) => {
      openNotification(
        "success",
        "Record Added",
        "Record was added successfully"
      );
      const data = { ...res.data };
      data.key = data.id;
      dispatch(addItem(data));
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

export const getDataById = async (id) => {
  return await axios
    .get(`http://localhost:8000/raw/user/${id}`)
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

export const sendEditedDataAction = async (data, dispatch) => {
  await axios
    .put("http://localhost:8000/raw/user", data)
    .then((res) => {
      openNotification(
        "success",
        "Record Edited",
        "Record was edited successfully"
      );
      const data = { ...res.data };
      data.key = data.id;
      console.log(res.data);
      dispatch(editItem(data));
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

export const sendDeleteDataRequest = async (id, dispatch) => {
  await axios
    .delete(`http://localhost:8000/raw/user/${id}`)
    .then((res) => {
      openNotification(
        "success",
        "Record Deleted",
        "Record was deleted successfully"
      );
      dispatch(deleteItem(id));
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
