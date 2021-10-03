import { Helmet } from "react-helmet";

export default function helmet(title, description) {
  const deslngth = description.length;

  console.log(
    `Max soll 120-140 sein. Der aktuelle SERP.length ist ${deslngth}`
  );

  return (
    <Helmet>
      <title>{`Spielplatzchecken.de - ${title}`}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
