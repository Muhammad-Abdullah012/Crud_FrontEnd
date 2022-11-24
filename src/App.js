import { useReducer } from "react";
import Home from "./pages/Home";
import { itemsReducer } from "./Reducers/Reducer";
import { Routes, Route } from "react-router-dom";
import { dispatchContext, stateContext } from "./Contexts";
import "./App.css";

const initialState = {
  isLoading: false,
  dataSource: [],
  filteredData: [],
  organizations: [],
  orders: [],
};

function App() {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

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
