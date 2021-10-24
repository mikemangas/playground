import "./Home.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import SubmitForm from "../components/SubmitForm";
import defaultVisitsPatch from "../hooks/defaultVisitsPatch";
import createInternLink from "../hooks/createInternLink";

export default function Home() {
  const history = useHistory();
  useEffect(() => {
    defaultVisitsPatch("615af57dff20382e9dd25aa9");
    defaultVisitsPatch("615af5a7ff20382e9dd25aac");
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    sessionStorage.setItem("inputText", JSON.stringify(formInputValue));
    form.reset();
    history.push(`/map`);
  }

  return (
    <div className="Home__outer__wrapper">
      <h6 className="Home__section__intro__subline">
        Der große Spielplatzfinder mit über 100.000 registrierten Spielplätzen
        in Deutschland.
      </h6>
      <section className="Home__section__banner">
        <div className="Home__banner-wrapper">
          <h1 className="Home__banner-title1">Spielplätze mit </h1>
          <h1 className="Home__banner-title2">Auslastung</h1>
          <h2 className="Home__banner-title3">finden</h2>
        </div>

        <form className="Home__SubmitForm" onSubmit={handleOnSubmit}>
          <SubmitForm individualClass="Home" handleOnSubmit={handleOnSubmit} />
          <div className="SubmitForm__checkbox">
            <p>
              Mit dem Klick auf "Suchen" stimmen sie unserer{" "}
              {createInternLink("/datenschutz", "Datenschutzerklärung")} zu.
            </p>
            <input
              className="SubmitForm__checkbox__ticker"
              type="checkbox"
              id="datenschutz"
              required
            ></input>
          </div>
        </form>
        <ol className="Home__Section__info__wrapper">
          <h2>So geht die Spielplatzsuche</h2>
          <li>Spielplatz finden</li>
          <li>Einchecken</li>
          <li>Beim Verlassen des Spielplatzes auschecken</li>
        </ol>
      </section>
    </div>
  );
}
