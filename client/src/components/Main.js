import { Switch, Route } from "react-router-dom";
import { useState } from "react";
import Home from "../pages/Home";
import Map from "../pages/Map";
import Impressum from "../pages/Impressum";
import Datenschutz from "../pages/Datenschutz";
import NotFound from "../pages/NotFound";
import Kontakt from "../pages/Kontakt";
import Faq from "../pages/Faq";
import Stats from "../pages/Stats";

export default function Main({ checkInState, checkOutState }) {
  const [lat, setLat] = useState();
  const [lon, setLon] = useState();

  return (
    <main className="Main">
      <Switch>
        <Route path="/impressum">
          <Impressum />
        </Route>
        <Route path="/map/">
          <Map
            latState={lat}
            lonState={lon}
            checkInState={checkInState}
            checkOutState={checkOutState}
          />
        </Route>

        <Route path="/api/playgroundshare/:latparams/:lonparams">
          <Map checkInState={checkInState} checkOutState={checkOutState} />
        </Route>

        <Route path="/datenschutz">
          <Datenschutz />
        </Route>
        <Route path="/kontakt">
          <Kontakt />
        </Route>
        <Route path="/faq">
          <Faq />
        </Route>
        <Route path="/stats">
          <Stats />
        </Route>

        <Route exact path="/">
          <Home lat={setLat} lon={setLon} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}
