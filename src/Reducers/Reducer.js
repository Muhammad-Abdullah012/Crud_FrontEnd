import {
  ADD_ITEM,
  ADD_ORDER,
  ADD_ORGANIZATION,
  DATA_LOADED,
  DELETE_ITEM,
  DELETE_ORDER,
  DELETE_ORGANIZATION,
  EDIT_ITEM,
  EDIT_ORDER,
  EDIT_ORGANIZATION,
  FILTERED_DATA,
  INITIALIZE_ORDERS,
  INITIALIZE_ORGANIZATIONS,
  INITIALIZE_STATE,
  LOADING_DATA,
} from "../Constants";

export const itemsReducer = (state, action) => {
  let dataSource;
  let idx;
  switch (action.type) {
    case INITIALIZE_STATE:
      dataSource = action.payload;
      return { ...state, dataSource };
    case ADD_ITEM:
      dataSource = [...state.dataSource, action.payload];
      return { ...state, dataSource };
    case DELETE_ITEM:
      dataSource = [...state.dataSource].filter((data) => {
        return data.id !== action.payload;
      });
      return { ...state, dataSource };
    case EDIT_ITEM:
      dataSource = [...state.dataSource];
      idx = dataSource.findIndex((record) => record.id === action.payload.id);
      dataSource[idx] = { ...action.payload, key: action.payload.id };
      return { ...state, dataSource };
    case FILTERED_DATA:
      return { ...state, filteredData: action.payload };
    case LOADING_DATA:
      return { ...state, isLoading: true };
    case DATA_LOADED:
      return { ...state, isLoading: false };
    case INITIALIZE_ORGANIZATIONS:
      return { ...state, organizations: action.payload };
    case ADD_ORGANIZATION:
      dataSource = [...state.organizations, action.payload];
      return { ...state, organizations: dataSource };
    case EDIT_ORGANIZATION:
      dataSource = [...state.organizations];
      idx = dataSource.findIndex((record) => record.id === action.payload.id);
      dataSource[idx] = { ...action.payload, key: action.payload.id };
      return { ...state, organizations: dataSource };
    case DELETE_ORGANIZATION:
      dataSource = [...state.organizations].filter((data) => {
        return data.id !== action.payload;
      });
      return { ...state, organizations: dataSource };
    case INITIALIZE_ORDERS:
      return { ...state, orders: action.payload };
    case ADD_ORDER:
      dataSource = [...state.orders, action.payload];
      return { ...state, orders: dataSource };
    case EDIT_ORDER:
      dataSource = [...state.orders];
      idx = dataSource.findIndex((record) => record.id === action.payload.id);
      dataSource[idx] = { ...action.payload, key: action.payload.id };
      return { ...state, orders: dataSource };
    case DELETE_ORDER:
      dataSource = [...state.orders].filter((data) => {
        return data.id !== action.payload;
      });
      return { ...state, orders: dataSource };

    default:
      return state;
  }
};
