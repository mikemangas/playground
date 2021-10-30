import "./SubmitForm.css";
import information from "../assets/Images/information.png";
import { useState } from "react";
import createInternLink from "../hooks/createInternLink";

export default function SubmitForm({ individualClass, isDisabled }) {
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
        {createInternLink("/faq", "Unser FAQ hilft dir bei Fragen. ")}
      </div>
      <img
        onClick={handleToolTipp}
        className="SubmitForm__info-button"
        src={information}
        alt="info-button"
      />

      <div className={"SubmitForm__search"}>
        <input
          required
          placeholder="PLZ, Ort oder Adresse"
          name="searchInput"
          id="searchInput"
        />

        <button disabled={isDisabled} type="submit">
          Suchen
        </button>
      </div>
    </div>
  );
}
