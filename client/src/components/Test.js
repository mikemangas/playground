import SelectDate from "./SelectDate";
import { useState } from "react";

export default function Test() {
  const [state1, setState1] = useState();
  const [state2, setState2] = useState();

  setTimeout(console.log(state1));
  setTimeout(console.log(state2));
  return <SelectDate toDay={setState1} todayMinusTen={setState2} />;
}
