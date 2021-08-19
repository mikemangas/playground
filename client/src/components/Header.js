import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import logo from "../assets/Images/swing_icon_colored.png";
import "./Header.css";

export default function Header() {
  const [toggleNavigationLinks, setToggleNavigationLinks] = useState(
    "Header__navigation--links--off"
  );

  const [toggleWrapper, setToggleWrapper] = useState(
    "Header__navigation__wrapper--off"
  );

  const [toggleButton, setToggleButton] = useState(
    "Header__navigation--toggle--off"
  );

  if (localStorage.getItem("userId") === null) {
    return localStorage.setItem("userId", JSON.stringify(uuidv4()));
  }

  function handleOnClick() {
    if (toggleNavigationLinks === "Header__navigation--links--off") {
      setToggleNavigationLinks("Header__navigation--links");
      setToggleWrapper("Header__navigation__wrapper");
      setToggleButton("Header__navigation--toggle");
    } else {
      setToggleNavigationLinks("Header__navigation--links--off");
      setToggleWrapper("Header__navigation__wrapper--off");
      setToggleButton("Header__navigation--toggle--off");
    }
  }

  return (
    <header className="Header">
      <Link to="/">
        <img className="Header__logo" width="50px" src={logo} alt="logo" />
      </Link>
      <section className={toggleWrapper}>
        <nav className={toggleNavigationLinks}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/map">Map</NavLink>
          <NavLink to="/impressum">Impressum</NavLink>
          <NavLink to="/datenschutz">Datenschutz</NavLink>
          <NavLink to="/wir">Über Uns</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>
          <NavLink to="/spielplatz-eintragen">Spielplatz Eintragen</NavLink>
        </nav>
        <div onClick={handleOnClick} className={toggleButton}>
          X
        </div>
      </section>
    </header>
  );
}
