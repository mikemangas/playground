import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/impressum">Impressum</NavLink>
      <NavLink to="/datenschutz">Datenschutz</NavLink>
      <NavLink to="/wir">Über Uns</NavLink>
      <NavLink to="/kontakt">Kontakt</NavLink>
      <NavLink to="/spielplatz-eintragen">Spielplatz Eintragen</NavLink>
    </header>
  );
}
