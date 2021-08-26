import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [checkInState, setCheckInState] = useState();
  const [checkOutState, setCheckOutState] = useState();
  const [dbUserId, setDbUserId] = useState(null);
  const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
  const [playgroundWhereUserIsCheckedIn, setPlaygroundWhereUserIsCheckedIn] =
    useState(null);

  useEffect(() => {
    const url = `/api/user/${localStorageUserId}`;
    fetch(url)
      .then((res) => res.json())
      .then((checkedInUser) => {
        setDbUserId(checkedInUser?.checkedInUserMongoId);
        setPlaygroundWhereUserIsCheckedIn(checkedInUser?.checkedInPlayground);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [localStorageUserId, checkInState, checkOutState]);

  function handleCheckOutButton() {
    const urlPlayground = `/api/playground/${playgroundWhereUserIsCheckedIn}`;
    const patchMethodCheckin = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorageUserId,
      }),
    };
    fetch(urlPlayground, patchMethodCheckin)
      .then((res) => {
        res.json();
      })
      .then(() => {
        setCheckOutState(dbUserId);
      });
  }

  return (
    <div className="App">
      {dbUserId && (
        <button
          className="Map__button--checkout"
          onClick={() => handleCheckOutButton()}
        >
          CHECK-OUT
        </button>
      )}
      <Header />
      <Main checkOutState={checkOutState} checkInState={setCheckInState} />
    </div>
  );
}

export default App;
