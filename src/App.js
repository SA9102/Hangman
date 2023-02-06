import LetterInput from "./components/LetterInput";
import LetterInputButton from "./components/LetterInputButton";
import CountryInput from "./components/CountryInput";
import CountryInputButton from "./components/CountryInputButton";
import NewButton from "./components/NewButton";
import { countryList } from "./countries";
import { useState, useEffect } from "react";

import "./App.css";

export default function App() {
  // Country name
  const [country, setCountry] = useState("");
  // What is displayed on the screen after inputs e.g. letters and underscores
  const [countryDisplay, setCountryDisplay] = useState("");
  // Controlled letter input
  const [letterInput, setLetterInput] = useState("");
  // Controlled word input
  const [countryInput, setCountryInput] = useState("");
  // The number of incorrect guesses the player can make, before they lose the game.
  const [incorrectGuessesLeft, setIncorrectGuessesLeft] = useState(5);
  // null when still playing; true when the player has won; false when the player has lost.
  const [hasWon, setHasWon] = useState(null);
  // A list of all entered letters
  const [enteredLetters, setEnteredLetters] = useState([])

  // Get a new country every time the page is loaded.
  // We pass an empty array so that this is not called every time a state changes.
  useEffect(() => {
    handleGetNewCountry()
  }, [""])

  // Gets another country name from the list every time the user starts a new game.
  const handleGetNewCountry = () => {
    const index = Math.floor(Math.random() * countryList.length);
    const countryName = countryList[index].toUpperCase();
    setCountry(countryName);
    setCountryDisplay(
      countryName.split("").map((letter) => (letter === "/" ? "/" : "_"))
    );
    setIncorrectGuessesLeft(5);
    setHasWon(null);
    setLetterInput('')
    setCountryInput('')
    setEnteredLetters([])
  };

  // Controlled input for entering a single letter.
  const handleLetterInput = (value) => {
    if (hasWon === null) {
      let inputValue = value
      if (inputValue.length > 1) {
        inputValue = inputValue[0]
      }
      setLetterInput(inputValue);
    }
  };

  // Controlled input for entering a country name.
  const handleCountryInput = (value) => {
    if (hasWon === null) {
      setCountryInput(value);
    }
  };

  // Check if the entered letter is part of the country name.
  const handleCheckLetter = () => {
    if (hasWon === null && !enteredLetters.includes(letterInput) & letterInput.trim() !== '') {
      let countryDisplayCopy = countryDisplay.slice();
      let incorrectGuessesLeftCopy = incorrectGuessesLeft;
      let incorrectGuessFlag = true;
      for (let index in country) {
        // If the player has made a correct guess.
        if (country[index] === letterInput.toUpperCase()) {
          countryDisplayCopy[index] = letterInput.toUpperCase();
          incorrectGuessFlag = false;
        }
      }
      setCountryDisplay(countryDisplayCopy);
      setEnteredLetters([...enteredLetters, letterInput.toUpperCase()])
      setLetterInput("");

      if (incorrectGuessFlag) {
        incorrectGuessesLeftCopy -= 1;
      }

      // If the player has used all their chances, they lose the game.
      if (incorrectGuessesLeftCopy <= 0) {
        setHasWon(false);
      }

      setIncorrectGuessesLeft(incorrectGuessesLeftCopy);
    }
  };

  // Check if the entered country name matches the one that is chosen by the program.
  const handleCheckCountry = () => {
    if (hasWon === null && countryInput.trim() !== '') {
      if (countryInput.trim().toUpperCase() === country.replace(/\//g, ' ')) {
        setCountryDisplay(country.toUpperCase());
        setHasWon(true);
      } else {
        setHasWon(false);
      }
    }
  };

  return (
    <section id="container">
      <div id="country-display">{countryDisplay}</div>
      <article className="input-container">
        <article className="input">
          <p>Letter</p>
          <LetterInput value={letterInput} onLetterInput={handleLetterInput} />
          <br />
          <LetterInputButton onCheckLetter={handleCheckLetter} />
        </article>
        <article className="input">
          <p>Country Name</p>
          <CountryInput value={countryInput} onCountryInput={handleCountryInput} />
          <br />
          <CountryInputButton onCheckCountry={handleCheckCountry} />
        </article>
      </article>
      <p>
        {hasWon === null
          ? `Incorrect guesses left: ${incorrectGuessesLeft}`
          : hasWon === true
          ? "You win!"
          : `You lost. The country was ${country.replace(/\//g, ' ')}.`}
      </p>
      <p>{`Guessed letters: ${enteredLetters}`}</p>
      <NewButton onGetNewCountry={handleGetNewCountry} />
    </section>
  );
}
