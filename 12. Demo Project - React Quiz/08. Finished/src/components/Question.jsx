import { useState } from "react";

import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../questions.js";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  /*
    answer state tracks:
    - selectedAnswer → what user clicked
    - isCorrect      → result after evaluation
  */
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  /*
    Dynamic timer logic:
    - Initial: 10s to answer
    - After click: 1s pause
    - After evaluation: 2s before next question
  */
  let timer = 10000;

  if (answer.selectedAnswer) {
    timer = 1000;
  }

  if (answer.isCorrect !== null) {
    timer = 2000;
  }

  function handleSelectAnswer(answer) {
    // Step 1: mark answer as selected
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    // Step 2: after 1s, evaluate correctness
    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      // Step 3: after 2s, notify parent
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  /*
    answerState is derived state
    → drives UI only
  */
  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      {/*
        key={timer} forces QuestionTimer to REMOUNT
        → resets internal timer state correctly
      */}
      <QuestionTimer
        key={timer}
        timeout={timer}
        onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
      />

      <h2>{QUESTIONS[index].text}</h2>

      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
