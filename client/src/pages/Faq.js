import { useState } from "react";
import "./Faq.css";

export default function Faq() {
  //   const [toggle, setToggle] = useState(false);
  const [selected, setSlected] = useState(null);

  function toggle(e) {
    if (selected) {
      setSlected(true);
    } else {
      setSlected(false);
    }
  }

  return (
    <div className="Faq__wrapper">
      <div className="Faq__question__wrapper">
        {data.map((questionUnit) => {
          return (
            <div onClick={toggle} className="Faq__question__unit">
              <h2 className="Faq__question">{questionUnit.question}</h2>
              <p className={selected === false ? "jo--hide" : "jo--show"}>
                {questionUnit.answer}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const data = [
  {
    question: "blabliblu?",
    answer: "yes thats me",
  },
  {
    question: "lelilu",
    answer: "yes yes, really me!",
  },
];
