import { useHistory } from "react-router-dom";

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
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="searchInput">PLZ oder Stadteil</label>
      <input name="searchInput" id="searchInput" />
      <button type="submit">SEND</button>
    </form>
  );
}
