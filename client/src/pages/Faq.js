import { useState, useEffect } from "react";
import defaultVisitsPatch from "../hooks/defaultVisitsPatch";
import "./Faq.css";
import { v4 as uuidv4 } from "uuid";

export default function Faq() {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    defaultVisitsPatch("6161602160b5ed21a33c5b98");
  }, []);

  function toggle(e) {
    setSelected(e);
    if (selected === e) {
      return setSelected(null);
    } else {
      return setSelected(e);
    }
  }

  const Fq = "Faq__question";

  return (
    <div className="Faq__wrapper">
      <div className={`${Fq}__mapped__wrapper`}>
        {data.map((questionUnit, i) => {
          return (
            <div key={uuidv4()} className={`${Fq}__unit`}>
              <div key={uuidv4()} className={`${Fq}__wrapper`}>
                <h4 key={uuidv4()} className={Fq}>
                  {questionUnit.question}
                </h4>
                <button key={uuidv4()} onClick={() => toggle(questionUnit)}>
                  {selected === questionUnit ? `x` : `✓`}
                </button>
              </div>
              <p
                key={uuidv4()}
                className={
                  selected === questionUnit ? `${Fq}--show` : `${Fq}--hide`
                }
              >
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
    question: "Wie kann ich am besten suchen?",
    answer:
      "Du gibst deinen aktuellen Standort in das Suchfeld auf der Startseite ein. Wenn du kein Ergebnis bekommst, hilft es häufig, wenn du eine Kombination aus Stadt oder Postleitzahl und Adresse eingibst, wie z.B. Münchener Straße Unterföhring. ",
  },

  {
    question:
      "Ich bin in der Nähe eines Spielplatzes, aber ich weiß nicht wie die Straße heißt. Wie kann ich mich trotzdem einchecken?",
    answer:
      "In der Kartenansicht gibt es den Button `meinen Standort zur Suche nutzen`. Dieser zeigt dir genau, wo du dich aktuell befindest.",
  },
  {
    question: "Ups, ich habe vergessen mich auszuchecken. Ist das schlimm?",
    answer:
      "Nein. Wenn du vergessen hast, dich auszuchecken, werden wir das automatisch für dich nach 3 Stunden tun.",
  },
  {
    question: "Was bedeuten die Spielplatzsymbole in grün oder grau?",
    answer:
      "Grün bedeutet, dass sich an dem bestimmten Spielpatz bereits mindestens eine Person eingecheckt hat. Grau bedeutet, dass sich bisher niemand eingecheckt hat.",
  },
  {
    question:
      "Kann ich mich über ein Gerät einchecken und über ein anderes auschecken?",
    answer:
      "Wir haben auf dieser Webseite bewusst keine Login-Funktion eingebaut, damit wir allen Eltern die Möglichkeit geben, an der Plattform teilzunehmen. Das hat aber den Preis, dass du dich mit demselben Gerät & Browser ein und auschecken musst.",
  },
  {
    question:
      "Was muss ich machen, nachdem ich mich bei einem Spielplatz eingecheckt habe?",
    answer:
      "Du besuchst den Spielplatz und wenn du ihn wieder verlässt, checkst du dich mit demselben Gerät wieder aus.",
  },

  {
    question: "Sind wirklich alle Spielplätze in ganz Deutschland eingetragen?",
    answer:
      "In unserer Datenbank sind fast alle öffentlich zugänglichen Spielplätze zu finden. ",
  },
  {
    question:
      "Ich habe einen Spielplatz auf der Webseite entdeckt, den es aber nicht existiert. Was kann ich tun?",
    answer:
      "Wir freuen uns sehr, wenn du solche Spielplätze bei uns über das Kontaktformular meldest. ",
  },
  {
    question:
      "Ich habe einen Spielplatz entdeckt, den es auf der Webseite nicht zu finden ist. Was kann ich tun?",
    answer:
      "Wir freuen uns auch in diesem Fall sehr, wenn du uns die Adresse zum Spielplatz sendest. Wir tragen allerdings nur öffentliche Spielplätze ein. Private Spielplätze sind in dieser Plattform ausgeschlossen.",
  },
  {
    question:
      "Repräsentiert die Anzahl der eingecheckten Personen die reale Auslastung eines Spielplatzes?",
    answer:
      "Die Informationen der aktuellen Auslastung basieren ausschließlich auf die Personen, die diese Webseite benutzen. Je mehr Personen diese Webseite nutzen, desto zuverlässiger und genauer werden die angegebenen Informationen sein.",
  },
];
