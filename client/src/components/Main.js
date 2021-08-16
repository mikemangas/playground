import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Map from "../pages/Map";
import Impressum from "../pages/Impressum";
import Datenschutz from "../pages/Datenschutz";
import NotFound from "../pages/NotFound";
import Kontakt from "../pages/Kontakt";
import UeberUns from "../pages/UeberUns";
import SpielplatzEintragen from "../pages/SpielplatzEintragen";

export default function Main() {
  return (
    <main className="main">
      <Switch>
        <Route path="/impressum">
          <Impressum />
        </Route>
        <Route path="/map/:params">
          <Map />
        </Route>
        <Route path="/datenschutz">
          <Datenschutz />
        </Route>
        <Route path="/kontakt">
          <Kontakt />
        </Route>
        <Route path="/wir">
          <UeberUns />
        </Route>
        <Route path="/spielplatz-eintragen">
          <SpielplatzEintragen />
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
