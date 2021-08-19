import "./Home.css";
import { useHistory } from "react-router-dom";
import SubmitForm from "../components/SubmitForm";

export default function Home() {
  const history = useHistory();

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    localStorage.setItem("inputText", JSON.stringify(formInputValue));
    form.reset();
    history.push(`/map`);
  }

  return (
    <section className="Home__section">
      <div className="Home__banner-wrapper">
        <h2 className="Home__banner-title1">Finde einen</h2>
        <h2 className="Home__banner-title2">Spielplatz</h2>
        <h2 className="Home__banner-title3">In deiner Nähe</h2>
      </div>
      <SubmitForm
        className={"Home__SubmitForm"}
        handleOnSubmit={handleOnSubmit}
      />
    </section>
  );
}
