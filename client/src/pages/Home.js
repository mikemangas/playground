import "./Home.css";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import SubmitForm from "../components/SubmitForm";
import defaultVisitsPatch from "../hooks/defaultVisitsPatch";
import createInternLink from "../hooks/createInternLink";

export default function Home({ lat, lon, setview }) {
  const [checkbox, setCheckbox] = useState(true);
  const [changingText, setChangingText] = useState("Spielplatz leer?");
  const history = useHistory();
  useEffect(() => {
    defaultVisitsPatch("615af57dff20382e9dd25aa9");
    defaultVisitsPatch("615af5a7ff20382e9dd25aac");
  }, []);
  const intervalForText = setInterval(setUpperTextFunction, 3600);

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    sessionStorage.setItem("inputText", JSON.stringify(formInputValue));
    form.reset();
    history.push(`/map`);
  }

  function privacyFunction() {
    setCheckbox(!checkbox);
  }

  function geoapiCoordinates(pos) {
    if (pos) {
      const { latitude, longitude } = pos.coords;
      lat(latitude);
      lon(longitude);
      history.push(`/map`);
    }
  }

  function geoapiGetLocation() {
    navigator.geolocation.getCurrentPosition(geoapiCoordinates);
  }

  function setUpperTextFunction() {
    if (changingText === "Spielplatz leer?") {
      setChangingText("Spielplatz zu voll?");
    } else if (changingText === "Spielplatz zu voll?") {
      setChangingText(
        "Du möchtest nie wieder enttäuscht werden, wenn du zum Spielplatz gehst?"
      );
    } else {
      setChangingText(
        "Bei Spielplatzchecken kannst du die Auslastung von über 85.000 öffentlichen Spielplätzen einsehen."
      );
    }
    clearInterval(intervalForText);
  }

  return (
    <div className="Home__outer__wrapper">
      <p className="Home__changingtext">{changingText}</p>

      <section className="Home__section__banner">
        <div className="Home__banner-wrapper">
          <h1 className="Home__banner-title1">Spielplätze mit </h1>
          <h1 className="Home__banner-title2">Auslastung</h1>
          <h2 className="Home__banner-title3">finden</h2>
        </div>

        <form className="Home__SubmitForm" onSubmit={handleOnSubmit}>
          <SubmitForm
            individualClass="Home"
            handleOnSubmit={handleOnSubmit}
            isDisabled={checkbox}
          />

          <button
            className={"Map__useLocation__button"}
            onClick={geoapiGetLocation}
            disabled={checkbox}
          >
            Meinen Standort zur Suche nutzen
          </button>
          <div className="SubmitForm__checkbox">
            <p>
              Stimme unserer{" "}
              {createInternLink("/datenschutz", "Datenschutzerklärung")} zu,
              damit du suchen kannst.
            </p>
            <input
              className="SubmitForm__checkbox__ticker"
              type="checkbox"
              id="datenschutz"
              onClick={privacyFunction}
            ></input>
          </div>
        </form>
        <ol className="Home__Section__info__wrapper">
          <h2>So geht die Spielplatzsuche</h2>
          <li>
            PLZ, Ort oder Adresse eingeben (alternativ die Funktion "Meinen
            Standort zur Suche nutzen" nutzen).
          </li>
          <li>Spielplatz finden</li>
          <li>Einchecken</li>
          <li>Beim Verlassen des Spielplatzes auschecken</li>
        </ol>
      </section>
    </div>
  );
}
