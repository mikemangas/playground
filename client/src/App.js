import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";

function App() {
  const [checkInState, setCheckInState] = useState();
  const [checkOutState, setCheckOutState] = useState();

  return (
    <div className="App">
      <Header checkInState={checkInState} checkOutState={setCheckOutState} />
      <Main checkOutState={checkOutState} checkInState={setCheckInState} />
    </div>
  );
}

export default App;
