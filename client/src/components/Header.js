import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import logo from "../assets/Images/logo.png";
import menu from "../assets/Images/menu-lines.png";
import menuClose from "../assets/Images/menu-close.png";
import "./Header.css";

export default function Header({ checkInState, checkOutState }) {
  const [toggleNavigationLinks, setToggleNavigationLinks] = useState(
    "Header__navigation--links--off"
  );
  const navLink = "Header__navigation__link";

  const [toggleWrapper, setToggleWrapper] = useState(
    "Header__navigation__wrapper--off"
  );

  const [toggleButton, setToggleButton] = useState(
    "Header__navigation--toggle--off"
  );

  const [toggleButtonContent, setToggleButtonContent] = useState(
    <img
      className="Header__navigation__menu__button Header__navigation__menu__button--open"
      src={menu}
      alt="menu-open-button"
    />
  );

  const [dbUserId, setDbUserId] = useState(null);
  const localStorageUserId = JSON.parse(localStorage.getItem("userId"));
  const [playgroundWhereUserIsCheckedIn, setPlaygroundWhereUserIsCheckedIn] =
    useState(null);

  if (localStorage.getItem("userId") === null) {
    localStorage.setItem("userId", JSON.stringify(uuidv4()));
  }

  function handleOnMenuClick() {
    if (toggleNavigationLinks === "Header__navigation--links--off") {
      setToggleNavigationLinks("Header__navigation--links");
      setToggleWrapper("Header__navigation__wrapper");
      setToggleButton("Header__navigation--toggle");
      setToggleButtonContent(
        <img
          className="Header__navigation__menu__button Header__navigation__menu__button--close"
          src={menuClose}
          alt="menu-close-button"
        />
      );
    } else {
      setToggleNavigationLinks("Header__navigation--links--off");
      setToggleWrapper("Header__navigation__wrapper--off");
      setToggleButton("Header__navigation--toggle--off");
      setToggleButtonContent(
        <img
          className="Header__navigation__menu__button Header__navigation__menu__button--open"
          src={menu}
          alt="menu-open-button"
        />
      );
    }
  }

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
  }, [localStorageUserId, checkInState]);

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
        checkOutState(dbUserId);
      });
  }

  return (
    <header className="Header">
      <Link className="Header__logo__wrapper" to="/">
        <img className="Header__logo" src={logo} alt="logo" />
      </Link>

      {dbUserId && (
        <button
          className="Map__button--checkout"
          onClick={() => handleCheckOutButton()}
        >
          CHECK-OUT
        </button>
      )}

      <section className={toggleWrapper}>
        <nav onClick={handleOnMenuClick} className={toggleNavigationLinks}>
          <NavLink className={navLink} to="/">
            Home
          </NavLink>
          <NavLink className={navLink} to="/map">
            Map
          </NavLink>
          <NavLink className={navLink} to="/spielplatz-eintragen">
            Spielplatz Eintragen
          </NavLink>
          <NavLink className={navLink} to="/wir">
            Über Uns
          </NavLink>
          <NavLink className={navLink} to="/kontakt">
            Kontakt
          </NavLink>
          <NavLink className={navLink} to="/impressum">
            Impressum
          </NavLink>
          <NavLink className={navLink} to="/datenschutz">
            Datenschutz
          </NavLink>
        </nav>
        <div onClick={handleOnMenuClick} className={toggleButton}>
          {toggleButtonContent}
        </div>
      </section>
    </header>
  );
}
