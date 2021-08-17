export default function SubmitForm({ handleOnSubmit }) {
  return (
    <form onSubmit={handleOnSubmit}>
      <label htmlFor="searchInput">PLZ oder Stadteil</label>
      <input name="searchInput" id="searchInput" />
      <button type="submit">SEND</button>
    </form>
  );
}
