export default function defaultVisitsPatch(id) {
  const url = `/api/visits/${id}`;
  const patchMethod = {
    method: "PATCH",
  };

  fetch(url, patchMethod);
}
