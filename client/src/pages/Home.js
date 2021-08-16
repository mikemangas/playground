import { useHistory } from "react-router-dom";

export default function Home() {
  const history = useHistory();

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formInputValue = form.searchInput.value;
    form.reset();
    history.push(`/map/${formInputValue}`);
  }

  return (
    <form onSubmit={handleOnSubmit}>
      <label for="searchInput">PLZ oder Stadteil</label>
      <input name="searchInput" id="searchInput" />
      <button type="submit">SEND</button>
    </form>
  );
}
