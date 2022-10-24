import { ADD_ITEM, DELETE_ITEM, EDIT_ITEM } from "../Constants";

export const addItemReducer = (state, action) => {
  let dataSource;
  switch (action.type) {
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
    default:
      return state;
  }
};
