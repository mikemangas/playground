import { Switch, Route } from "react-router-dom";
import Home from "../pages/Home";
import Map from "../pages/Map";
import Impressum from "../pages/Impressum";
import Datenschutz from "../pages/Datenschutz";
import NotFound from "../pages/NotFound";
import Kontakt from "../pages/Kontakt";
import Faq from "../pages/Faq";
import Stats from "../pages/Stats";

export default function Main({ checkInState, checkOutState }) {
  // const [exportedLatState, setExportedLatState] = useState();
  // const [exportedLonState, setExportedLonState] = useState();

  // let { eins } = useParams();
  // console.log(eins);

  // /api/playgroundshare/48.1064201/24.444/

  // path="/{id}/solution"
  // console.log(eins);

  return (
    <main className="Main">
      <Switch>
        <Route path="/impressum">
          <Impressum />
        </Route>
        <Route path="/map/">
          <Map checkInState={checkInState} checkOutState={checkOutState} />
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
          <Home />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
  );
}
