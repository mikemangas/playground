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

  return <SubmitForm handleOnSubmit={handleOnSubmit} />;
}
