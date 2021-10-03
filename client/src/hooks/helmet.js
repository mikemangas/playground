import { Helmet } from "react-helmet";

export default function helmet(title, description) {
  return (
    <Helmet>
      <title>{`Spielplatzchecken.de - ${title}`}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
}
