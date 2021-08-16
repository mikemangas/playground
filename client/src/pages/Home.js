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
      <input
        name="searchInput"
        id="searchInput"
        placeholder="PLZ oder Stadteil"
      />
      <button type="submit">SEND</button>
    </form>
  );
}
