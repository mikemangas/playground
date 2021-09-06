import "./SubmitForm.css";
import information from "../assets/Images/information.png";
import { useState } from "react";

export default function SubmitForm({
  handleOnSubmit,
  className,
  individualClass,
}) {
  const [toolTipp, setToolTipp] = useState(
    `${individualClass}__SubmitForm__toolTipp--hide`
  );

  function handleToolTipp() {
    if (toolTipp === `${individualClass}__SubmitForm__toolTipp--hide`) {
      setToolTipp(`${individualClass}__SubmitForm__toolTipp--show`);
    } else {
      setToolTipp(`${individualClass}__SubmitForm__toolTipp--hide`);
    }
  }

  return (
    <div>
      <div className={toolTipp}>
        Eine 2er Kombination funktioniert am Besten. z.B.: Musterstraße
        Musterstadt
      </div>
      <img
        onClick={handleToolTipp}
        className="SubmitForm__info-button"
        src={information}
        alt="info-button"
      />
      <form className={`SubmitForm ${className}`} onSubmit={handleOnSubmit}>
        <input
          required
          placeholder="PLZ, Ort oder Adresse"
          name="searchInput"
          id="searchInput"
        />
        <button type="submit"> Suchen </button>
      </form>
    </div>
  );
}
