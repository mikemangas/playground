import "./Home.css";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import SubmitForm from "../components/SubmitForm";
import defaultVisitsPatch from "../hooks/defaultVisitsPatch";

export default function Home() {
  const history = useHistory();
  useEffect(() => {
    defaultVisitsPatch("615af57dff20382e9dd25aa9");
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    localStorage.setItem("inputText", JSON.stringify(formInputValue));
    form.reset();
    history.push(`/map`);
  }

  return (
    <div className="Home__outer__wrapper">
      <section className="Home__section__banner">
        <div className="Home__banner-wrapper">
          <h2 className="Home__banner-title1">Spielplätze mit </h2>
          <h2 className="Home__banner-title2">Auslastung</h2>
          <h2 className="Home__banner-title3">finden</h2>
        </div>
        <SubmitForm
          individualClass="Home"
          className={"Home__SubmitForm"}
          handleOnSubmit={handleOnSubmit}
        />
        <ol className="Home__Section__info__wrapper">
          <li>Spielplatz finden</li>
          <li>Beim Betreten des Spielplatzes - Einchecken</li>
          <li>Beim Verlassen des Spielplatzes - Auschecken</li>
        </ol>
      </section>

      <h2 className="Home__section__intro__subline">
        Über 100.000 registrierte Spielplätze
      </h2>
    </div>
  );
}
