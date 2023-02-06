export default function CountryInput({value, onCountryInput}) {
  return (
    <input
      type="text"
      onChange={(e) => onCountryInput(e.target.value)}
      value={value}
      id="word-input"
      className="input-box"
      name="word-input"
    ></input>
  );
}
