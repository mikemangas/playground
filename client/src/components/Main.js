import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Impressum from "../pages/Impressum";
import Datenschutz from "../pages/Datenschutz";
import NotFound from "../pages/NotFound";
import Kontakt from "../pages/Kontakt";
import UeberUns from "../pages/UeberUns";
import SpielplatzEintragen from "../pages/SpielplatzEintragen";
import Home2 from "../pages/Home2";

export default function Main() {
  return (
    <main className="main">
      <Switch>
        <Route path="/impressum">
          <Impressum />
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
        <Route path="/2">
          <div id="mapid"></div>
          <Home2 />
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
