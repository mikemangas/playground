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
    <>
      <div className="home__banner__wrapper">
        <h2 className="home__banner__title1">Finde einen</h2>
        <h2 className="home__banner__title2">Spielplatz</h2>
        <h2 className="home__banner__title3">In deiner Nähe</h2>
      </div>
      <SubmitForm
        className={"home__submitform"}
        handleOnSubmit={handleOnSubmit}
      />
    </>
  );
}
