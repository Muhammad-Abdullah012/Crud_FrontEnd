import { useEffect, useReducer } from "react";
import Home from "./pages/Home";
import { itemsReducer } from "./Reducers/Reducer";
import { dataLoaded, loadingData, setDataSource } from "./Actions";
import { dispatchContext, stateContext } from "./Contexts";
import axios from "axios";
import "./App.css";

const initialState = {
  isLoading: false,
  dataSource: [],
  filteredData: [],
};

function App() {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  useEffect(() => {
    dispatch(loadingData());
    (async () => {
      await axios
        .get("http://localhost:8000/users")
        .then((res) => {
          const data = res.data.map((v) => {
            const obj = { ...v };
            obj.key = obj.id.toString();
            dispatch(dataLoaded());
            return obj;
          });
          dispatch(setDataSource(data));
        })
        .catch((err) => console.error(err));
    })();
  }, []);

  // console.log("State is: ", state);
  return (
    <div className="App">
      <dispatchContext.Provider value={dispatch}>
        <stateContext.Provider value={state}>
          <Home />
        </stateContext.Provider>
      </dispatchContext.Provider>
    </div>
  );
}

export default App;
