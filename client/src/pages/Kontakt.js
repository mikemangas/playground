import ContactForm from "../components/ContactForm";
import helmet from "../hooks/helmet";
import { useEffect } from "react";

export default function Kontakt() {
  useEffect(() => {
    const url = "/api/visits/615af635ff20382e9dd25aad";

    const patchMethodCheckin = {
      method: "PATCH",
    };
    fetch(url, patchMethodCheckin)
      .then((res) => {
        res.json();
      })
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {helmet(
        "Kontakt",
        "Hast du einen Spielplatz entdeckt, der nicht in unserer Datenbank ist? Möchtest du uns etwas anderes mitteilen? Dann schreibe uns gerne."
      )}
      <h1>Kontakt</h1>
      <p>
        Du hast eine Frage oder hast einen Spielplatz entdeckt, den wir nicht in
        unserer Datenbank haben? Dann schreib uns gerne.
      </p>
      <ContactForm />
    </>
  );
}
