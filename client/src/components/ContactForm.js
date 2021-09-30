import "./ContactForm.css";
import toast from "react-hot-toast";

export default function ContactForm() {
  const telPattern = /^\d{7,16}$/;
  const eMailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const cF = "ContactForm";

  function telValidation(field, regex) {
    const regexTest = regex.test(field);
    if (regexTest === false) {
      toast.error(`Etwas stimmt nicht mit deiner Telefonnummer`);
    }
  }

  function emailValidation(field, regex) {
    const regexTest = regex.test(field);
    if (regexTest === false) {
      toast.error(`Etwas stimmt nicht mit deiner E-Mail-Adresse`);
    }
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const tel = form.tel.value;
    const eMail = form.eMail.value;
    const message = form.message.value;
    const subject = form.subject.value;
    const fName = form.fName.value;
    const validationTask = parseInt(form.validationTask.value);

    telValidation(tel, telPattern);
    emailValidation(eMail, eMailPattern);

    if (validationTask === 999) {
      const postMethod = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tel,
          eMail,
          message,
          subject,
          fName,
        }),
      };

      fetch("/api/contactform", postMethod)
        .then((res) => {
          res.json();
        })
        .then((res) => {
          console.log("OK");
          toast(
            "Super, deine Nachricht ist bei uns angekommen. Wir werden uns bald bei dir melden!"
          );
        })
        .catch((error) => {
          console.error(
            error + "there has been a problem while sending us a message"
          );
        });
    } else {
      toast.error(" Du hast die Aufgabe leider nicht gelöst.");
    }
  }
  return (
    <form onSubmit={handleOnSubmit} className={cF}>
      <label htmlFor="subject">Betreff</label>
      <div className={`${cF}__subject`}>
        <input
          required
          placeholder="z.B. Angebot"
          name="subject"
          id="subject"
        />
      </div>
      <label htmlFor="fName">Vorname</label>
      <div className={`${cF}__fName`}>
        <input required placeholder="z.B. Max" name="fName" id="vorname" />
      </div>
      <label type="email" htmlFor="eMail">
        E-Mail
      </label>
      <div className={`${cF}__eMail`}>
        <input required placeholder="z.B. abc@def.de" name="eMail" id="eMail" />
      </div>
      <label htmlFor="message">Ihre Nachricht</label>
      <div className={`${cF}__message`}>
        <textarea
          placeholder="z.B. Da ist ein Spielplatz auf der Maximilianstraße 13a, Hannover "
          cols="25"
          rows="10"
          name="message"
          id="message"
        />
      </div>
      <label htmlFor="validationTask">
        Was macht eintausend minus eins (Zahl eingeben)?
      </label>
      <div className={`${cF}__validationTask`}>
        <input
          required
          placeholder="z.B. 123"
          name="validationTask"
          id="validationTask"
        />
      </div>

      <button className={`${cF}__submit`} type="submit">
        Nachricht senden
      </button>
    </form>
  );
}
