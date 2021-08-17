export default function CheckInText({ data, hasId }) {
  const checkout = "CHECK-OUT";
  const checkin = "CHECK-IN";

  if (hasId) {
    localStorage.setItem("CHECKED", JSON.stringify(true));
    return checkout;
  } else {
    localStorage.setItem("CHECKED", JSON.stringify(false));
    return checkin;
  }
}
