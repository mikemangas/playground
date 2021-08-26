import Main from "./components/Main";
import Header from "./components/Header";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [checkInState, setCheckInState] = useState();
  const [dbUserId, setDbUserId] = useState(null);
  const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
  const [playgroundWhereUserIsCheckedIn, setPlaygroundWhereUserIsCheckedIn] =
    useState(null);
  const [updatePage, setUpdatePage] = useState();

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
  }, [localStorageUserId, updatePage, checkInState]);

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
        setUpdatePage(!updatePage);
      });
  }

  return (
    <div className="App">
      {checkInState && dbUserId && (
        <button
          className="Map__button--checkout"
          onClick={() => handleCheckOutButton()}
        >
          CHECK-OUT
        </button>
      )}
      <Header />
      <Main checkInState={setCheckInState} />
    </div>
  );
}

export default App;
