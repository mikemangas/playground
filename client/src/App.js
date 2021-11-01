import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [checkInState, setCheckInState] = useState();
  const [checkOutState, setCheckOutState] = useState();

  useEffect(() => {
    const url = `/api/referrer/`;
    let referrer = document.referrer;
    if (referrer === "") {
      referrer = "Direct";
    }
    let settings = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        referrer,
      }),
    };
    async function fetchReferrer() {
      try {
        let response = await fetch(url, settings);
        response = await response.json();
        console.log("hi", response);
      } catch (e) {
        console.error("fetch referrers error:", e);
      }
    }
    fetchReferrer();
  }, []);

  return (
    <div className="App">
      <Header checkInState={checkInState} checkOutState={setCheckOutState} />
      <Main checkOutState={checkOutState} checkInState={setCheckInState} />
    </div>
  );
}

export default App;
