export default function CheckInText({ data, hasId }) {
  const url = `api/playground/${data._id}`;
  const checkout = "CHECK-OUT";
  const checkin = "CHECK-IN";

  fetch(url)
    .then((res) => {
      res.json();
    })
    .catch((error) => {
      console.error(error);
    });
  if (hasId) {
    return checkout;
  } else {
    return checkin;
  }
}
