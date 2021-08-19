import "./SubmitForm.css";

export default function SubmitForm({ handleOnSubmit, className }) {
  return (
    <form className={`SubmitForm ${className}`} onSubmit={handleOnSubmit}>
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
