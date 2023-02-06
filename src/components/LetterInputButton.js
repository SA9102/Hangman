export default function LetterInputButton({onCheckLetter}) {
    return <button type="button" className="enter" maxlength="1" onClick={onCheckLetter}>Enter</button>
}