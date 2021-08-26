import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import logo from "../assets/Images/logo.png";
import menu from "../assets/Images/menu-lines.png";
import menuClose from "../assets/Images/menu-close.png";
import "./Header.css";

export default function Header() {
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

  if (localStorage.getItem("userId") === null) {
    localStorage.setItem("userId", JSON.stringify(uuidv4()));
  }

  function handleOnClick() {
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

  return (
    <header className="Header">
      <Link className="Header__logo__wrapper" to="/">
        <img className="Header__logo" src={logo} alt="logo" />
      </Link>

      <section className={toggleWrapper}>
        <nav onClick={handleOnClick} className={toggleNavigationLinks}>
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
        <div onClick={handleOnClick} className={toggleButton}>
          {toggleButtonContent}
        </div>
      </section>
    </header>
  );
}
