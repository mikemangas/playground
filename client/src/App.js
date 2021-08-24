import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";

function App() {
  const [callback, setCallback] = useState();

  return (
    <div className="App">
      <Header callback={callback} />
      <Main setCallback={setCallback} />
    </div>
  );
}

export default App;
