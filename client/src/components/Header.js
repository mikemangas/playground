import { NavLink } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
export default function Header() {
  if (localStorage.getItem("userId") === null) {
    return localStorage.setItem("userId", JSON.stringify(uuidv4()));
  }

  return (
    <nav className="nav">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/map">Map</NavLink>
      <NavLink to="/impressum">Impressum</NavLink>
      <NavLink to="/datenschutz">Datenschutz</NavLink>
      <NavLink to="/wir">Über Uns</NavLink>
      <NavLink to="/kontakt">Kontakt</NavLink>
      <NavLink to="/spielplatz-eintragen">Spielplatz Eintragen</NavLink>
    </nav>
  );
}
