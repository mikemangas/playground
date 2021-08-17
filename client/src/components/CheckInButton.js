export default function CheckinButton({ data, handleCheckButton, isDisabled }) {
  return (
    <button disabled={isDisabled} onClick={() => handleCheckButton(data)}>
      CHECK-IN
    </button>
  );
}
