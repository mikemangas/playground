export default function defaultVisitsPatch(id) {
  const url = `/api/visits/${id}`;
  fetch(url)
    .then((res) => {
      res.json();
    })
    .catch((err) => {
      console.error(err);
    });
}
