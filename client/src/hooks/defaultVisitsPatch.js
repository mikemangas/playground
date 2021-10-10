export default function defaultVisitsPatch(id) {
  const url = `/api/visits/${id}`;
  fetch(url)
    .then((res) => {
      res.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(err);
    });
}
