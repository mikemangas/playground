import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import logo from "../assets/Images/swing_icon_colored.png";

export default function Header() {
  if (localStorage.getItem("userId") === null) {
    return localStorage.setItem("userId", JSON.stringify(uuidv4()));
  }

  return (
    <header className="Header">
      <img className="Header__logo" width="50px" src={logo} alt="logo" />
      <nav className="Header__navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink to="/impressum">Impressum</NavLink>
        <NavLink to="/datenschutz">Datenschutz</NavLink>
        <NavLink to="/wir">Über Uns</NavLink>
        <NavLink to="/kontakt">Kontakt</NavLink>
        <NavLink to="/spielplatz-eintragen">Spielplatz Eintragen</NavLink>
      </nav>
    </header>
  );
}
