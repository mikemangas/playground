import { useEffect } from "react";

export default function useCreateFetchEffect(url, setData) {
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error(error));
  }, []);
}
