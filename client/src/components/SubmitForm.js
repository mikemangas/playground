import "./SubmitForm.css";
import information from "../assets/Images/information.png";
import { useState } from "react";
import createInternLink from "../hooks/createInternLink";

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
        <div className={"SubmitForm__search"}>
          <input
            required
            placeholder="PLZ, Ort oder Adresse"
            name="searchInput"
            id="searchInput"
          />

          <button type="submit"> Suchen </button>
        </div>
        <div className="SubmitForm__checkbox">
          <p>
            Mit dem Klick auf "Suchen" stimmen sie unserer{" "}
            {createInternLink("/datenschutz", "Datenschutzerklärung")} zu.
          </p>
          <input
            className="SubmitForm__checkbox__ticker"
            type="checkbox"
            id="datenschutz"
            required
          ></input>
        </div>
      </form>
    </div>
  );
}
