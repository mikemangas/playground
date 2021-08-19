import "./Submitform.css";

export default function SubmitForm({ handleOnSubmit, className }) {
  return (
    <form className={`submitform ${className}`} onSubmit={handleOnSubmit}>
      <input
        required
        placeholder="Ort oder Postleitzahl"
        name="searchInput"
        id="searchInput"
      />
      <button type="submit"> send </button>
    </form>
  );
}
