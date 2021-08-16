export default function CheckInText({ data, hasId, check }) {
  const url = `api/playground/${data._id}`;
  fetch(url)
    .then((res) => {
      res.json();
    })
    .catch((error) => {
      console.error(error);
    });
  if (hasId) {
    return "CHECK-OUT";
  } else {
    return "CHECK-IN";
  }
}
