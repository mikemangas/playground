import createLink from "../hooks/createLink";
import helmet from "../hooks/helmet";
import { useEffect } from "react";
import defaultVisitsPatch from "../hooks/defaultVisitsPatch";
import "./Datenschutz.css";

export default function Impressum() {
  useEffect(() => {
    defaultVisitsPatch("615af590ff20382e9dd25aaa");
    defaultVisitsPatch("615af5a7ff20382e9dd25aac");
  }, []);

  return (
    <div className="Datenschutz">
      {helmet(
        "Impressum",
        "Hier bekommst du die wichtigsten Informationen zum Seiteninhaber"
      )}

      <h1>Impressum</h1>
      <p>
        Angaben gemäß § 5 TMG MSc. Michail Mangasarov Cimbernstraße 13a 81377
        München Kontakt Telefon: 017656763760 E-Mail:
        kontakt[@]kindersport-wissen.de <br></br>
        <br></br>
        Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV Michail Mangasarov
        Haftung für Inhalte Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für
        eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
        verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch
        nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen
        zu überwachen oder nach Umständen zu forschen, die auf eine
        rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
        Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen
        bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst
        ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich.
        <br></br>
        <br></br>
        Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese
        Inhalte umgehend entfernen. Haftung für Links Unser Angebot enthält
        Links zu externen Websites Dritter, auf deren Inhalte wir keinen
        Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine
        Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der
        jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die
        verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche
        Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der
        Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der
        verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
        Rechtsverletzung nicht zumutbar. <br></br>
        <br></br>Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
        Links umgehend entfernen. Urheberrecht Die durch die Seitenbetreiber
        erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen
        Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
        Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
        schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
        Downloads und Kopien dieser Seite sind nur für den privaten, nicht
        kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite
        nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter
        beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet.
        Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden,
        bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von
        Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.{" "}
        {createLink("https://e-recht24.de", "e-recht24.de")}
      </p>
    </div>
  );
}
