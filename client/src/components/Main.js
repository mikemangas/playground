import { Switch, Route } from "react-router-dom";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const url = `/api/referrer/`;
    let referrer = document.referrer;

    if (referrer !== "" && !referrer.includes("localhost")) {
      let settings = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrer,
        }),
      };
      async function fetchReferrer() {
        try {
          let response = await fetch(url, settings);
          response = await response.json();
          console.log("response", response);
        } catch (e) {
          console.error("fetch referrers error:", e);
        }
      }
      fetchReferrer();
    }
  }, []);

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
