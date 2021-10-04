import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import { useEffect, useState } from "react";
import defaultVisitsPatch from "./hooks/defaultVisitsPatch";

function App() {
  const [checkInState, setCheckInState] = useState();
  const [checkOutState, setCheckOutState] = useState();

  useEffect(() => {
    defaultVisitsPatch("615af5a7ff20382e9dd25aac");
  }, []);

  return (
    <div className="App">
      <Header checkInState={checkInState} checkOutState={setCheckOutState} />
      <Main checkOutState={checkOutState} checkInState={setCheckInState} />
    </div>
  );
}

export default App;
