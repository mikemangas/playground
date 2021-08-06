import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
// import Main from "../components/Main";
// import { useEffect, useState } from "react";

function App() {
  /* This is just an example to show that we can access
  the endpoint wihout writing the whole path, and that 
  the proxy feature of the create-react-app proxies the request
  to our server application */
  // useEffect(() => {
  //   fetch("/api/hello-world") // localhost:3000/api/hello-world -> localhost:4000/api/hello-world
  //     .then((res) => res.json())
  //     .then((data) => setText(data));
  // });

  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
