//unused component

import { useEffect } from "react";
export default function SelectDate({ toDay, todayMinusTen }) {
  let today = new Date();
  today = today.toISOString().split("T")[0];
  let todayForTenDaysAgo = new Date();
  let tenDaysAgo = todayForTenDaysAgo.setDate(
    todayForTenDaysAgo.getDate() - 10
  );
  tenDaysAgo = new Date(tenDaysAgo).toISOString().split("T")[0];

  function setDays() {
    todayMinusTen(tenDaysAgo);
    toDay(today);
  }

  useEffect(() => {
    setDays();
  }, []);

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    let inputFrom = form.dateFrom.value;
    let inputUntil = form.dateUntil.value;
    todayMinusTen(inputFrom);
    toDay(inputUntil);
  }

  return (
    <form className="SelectDate__form" onSubmit={handleOnSubmit}>
      <div className="SelectDate__form__date">
        <label htmlFor="dateFrom">From</label>
        <input
          type="date"
          id="dateFrom"
          name="dateFrom"
          defaultValue={tenDaysAgo}
        />
      </div>
      <div className="SelectDate__form__date">
        <label htmlFor="dateUntil">Until</label>
        <input
          type="date"
          id="dateUntil"
          name="dateUntil"
          defaultValue={today}
        />
      </div>
      <button className="SelectDate__form__submitButton" type="submit">
        RENDER
      </button>
    </form>
  );
}
