import { useReducer } from "react";
import Home from "./pages/Home";
import { addItemReducer } from "./Reducers/Reducer";
import { dispatchContext, stateContext } from "./Contexts";

import "./App.css";

const initialState = {
  dataSource: [],
};

function App() {
  const [state, dispatch] = useReducer(addItemReducer, initialState, () => {
    return {
      dataSource: [
        {
          id: 0,
          key: "0",
          name: "Henry",
          age: 33,
          profession: "Student",
          address: "10 Downing Street",
        },
        {
          id: 1,
          key: "1",
          name: "John",
          age: 42,
          profession: "Teacher",
          address: "10 Downing Street",
        },
      ],
    };
  });

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
