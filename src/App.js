import { useEffect, useReducer } from "react";
import Home from "./pages/Home";
import { itemsReducer } from "./Reducers/Reducer";
import { Routes, Route } from "react-router-dom";
import {
  dataLoaded,
  loadingData,
  openNotification,
  setDataSource,
} from "./Actions";
import { dispatchContext, stateContext } from "./Contexts";
import axios from "axios";
import "./App.css";
import { BASE_URL, USERS_PATH } from "./Constants";

const initialState = {
  isLoading: false,
  dataSource: [],
  filteredData: [],
  organizations: [],
  orders: [],
};

function App() {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  useEffect(() => {
    dispatch(loadingData());
    axios
      .get(`${BASE_URL}${USERS_PATH}`)
      .then((res) => {
        dispatch(dataLoaded());
        if (res.data.length <= 0) {
          dispatch(setDataSource(res.data));
          return;
        }
        const data = res.data.map((v) => {
          const obj = { ...v };
          obj.key = obj.id.toString();
          return obj;
        });
        dispatch(setDataSource(data));
      })
      .catch((err) => {
        openNotification(
          "error",
          "Error Occured",
          "An Error occured while fetching data!"
        );
        console.error(err);
      });
  }, []);

  console.log("State is: ", state);
  return (
    <div className="App">
      <dispatchContext.Provider value={dispatch}>
        <stateContext.Provider value={state}>
          <Routes>
            <Route path="/*" element={<Home />} />
          </Routes>
        </stateContext.Provider>
      </dispatchContext.Provider>
    </div>
  );
}

export default App;
