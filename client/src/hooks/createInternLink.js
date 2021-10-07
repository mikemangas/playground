import { Link } from "react-router-dom";

export default function createInternLink(link, text) {
  return <Link to={link}>{text}</Link>;
}
