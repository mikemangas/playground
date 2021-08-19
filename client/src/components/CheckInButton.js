export default function CheckinButton({
  data,
  handleCheckButton,
  isDisabled,
  className,
}) {
  return (
    <button
      className={className}
      disabled={isDisabled}
      onClick={() => handleCheckButton(data)}
    >
      CHECK-IN
    </button>
  );
}
