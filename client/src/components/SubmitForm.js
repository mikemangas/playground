import "./SubmitForm.css";
import information from "../assets/Images/information.png";
import { useState } from "react";
import createInternLink from "../hooks/createInternLink";
import { Link } from "react-router-dom";

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
        <Link to="/faq">Unser FAQ hilft dir bei Fragen.</Link>
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

        <button type="submit"> Suchen </button>
      </div>
    </div>
  );
}
