import ContactForm from "../components/ContactForm";
import helmet from "../hooks/helmet";

export default function Kontakt() {
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
