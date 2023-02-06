export default function LetterInput({ value, onLetterInput }) {
  return (
    <input
      type="text"
      onChange={(e) => onLetterInput(e.target.value)}
      maxLength="1"
      value={value}
      id="letter-input"
      className="input-box"
      name="letter-input"
    ></input>
  );
}
