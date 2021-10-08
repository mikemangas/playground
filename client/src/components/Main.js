import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Map from "../pages/Map";
import Impressum from "../pages/Impressum";
import Datenschutz from "../pages/Datenschutz";
import NotFound from "../pages/NotFound";
import Kontakt from "../pages/Kontakt";
import Login from "../pages/Login";

export default function Main({ checkInState, checkOutState }) {
  return (
    <main className="Main">
      <Switch>
        <Route path="/impressum">
          <Impressum />
        </Route>
        <Route path="/map/">
          <Map checkInState={checkInState} checkOutState={checkOutState} />
        </Route>
        <Route path="/datenschutz">
          <Datenschutz />
        </Route>
        <Route path="/kontakt">
          <Kontakt />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}
