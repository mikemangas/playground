import "./SubmitForm.css";

export default function SubmitForm({ handleOnSubmit, className }) {
  return (
    <form className={`SubmitForm ${className}`} onSubmit={handleOnSubmit}>
      <input
        required
        placeholder="PLZ, Ort oder Adresse"
        name="searchInput"
        id="searchInput"
      />
      <button type="submit"> Suchen </button>
    </form>
  );
}
