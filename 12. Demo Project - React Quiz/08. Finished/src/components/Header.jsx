import logoImg from "../assets/quiz-logo.png";

/*
  Pure presentational component
  - No state
  - No side effects
*/
export default function Header() {
  return (
    <header>
      <img src={logoImg} alt="Quiz logo" />
      <h1>ReactQuiz</h1>
    </header>
  );
}
