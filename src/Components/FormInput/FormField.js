export default function FormField({ htmlFor, value, onChangeAction }) {
  return (
    <>
      <label htmlFor={htmlFor}>{htmlFor.toUpperCase()}:</label>
      <input
        type={htmlFor}
        id={htmlFor}
        value={value}
        onChange={(e) => onChangeAction(e.target.value)}
        required
      />
    </>
  );
}
