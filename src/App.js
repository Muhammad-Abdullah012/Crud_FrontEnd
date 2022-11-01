import { useEffect, useReducer } from "react";
import Home from "./pages/Home";
import { itemsReducer } from "./Reducers/Reducer";
import { initializeState } from "./Actions";
import { dispatchContext, stateContext } from "./Contexts";

import "./App.css";
import axios from "axios";

const initialState = {
  dataSource: [],
};

/*
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
*/

function App() {
  const [state, dispatch] = useReducer(itemsReducer, initialState);

  useEffect(() => {
    (async () => {
      await axios
        .get("http://localhost:8000/users")
        .then((res) => {
          const data = res.data.map((v) => {
            const obj = { ...v };
            obj.key = obj.id.toString();
            return obj;
          });
          dispatch(initializeState(data));
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
