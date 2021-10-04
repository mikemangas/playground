export default function defaultVisitsPatch(id) {
  const url = `/api/visits/${id}`;
  console.log(url);
  const patchMethod = {
    method: "PATCH",
  };

  fetch(url, patchMethod);
}
