import {
  ADD_ITEM,
  DATA_LOADED,
  DELETE_ITEM,
  EDIT_ITEM,
  FILTERED_DATA,
  INITIALIZE_STATE,
  LOADING_DATA,
} from "../Constants";

export const itemsReducer = (state, action) => {
  let dataSource;
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
      const idx = dataSource.findIndex(
        (record) => record.id === action.payload.id
      );
      dataSource[idx] = { ...action.payload, key: action.payload.id };
      return { ...state, dataSource };
    case FILTERED_DATA:
      return { ...state, filteredData: action.payload };
    case LOADING_DATA:
      return { ...state, isLoading: true };
    case DATA_LOADED:
      return { ...state, isLoading: false };
    default:
      return state;
  }
};
