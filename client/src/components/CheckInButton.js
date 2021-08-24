export default function CheckinButton({
  data,
  handleCheckInButton,
  isDisabled,
  className,
}) {
  return (
    <button
      className={className}
      disabled={isDisabled}
      onClick={() => handleCheckInButton(data)}
    >
      CHECK-IN
    </button>
  );
}
