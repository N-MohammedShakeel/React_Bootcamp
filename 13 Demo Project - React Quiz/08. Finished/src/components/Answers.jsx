import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  /*
    =================================================
    WHY useRef IS USED HERE
    =================================================

    Problem without useRef:
    - Component re-renders whenever:
      ✔ selectedAnswer changes
      ✔ answerState changes
    - If answers were shuffled during render or via useState,
      they would reshuffle on EVERY re-render
    - That would:
      ❌ change button order after click
      ❌ confuse users
      ❌ break answer feedback

    What useRef provides:
    - A persistent container across re-renders
    - Updating `.current` does NOT trigger a re-render
    - Perfect for storing values that should "stick"
      but are NOT part of the UI state
  */

  /*
    IMPORTANT:
    - Every NEW Answers component instance
      gets its OWN useRef
    - When the parent renders a NEW question,
      this component mounts again
    - A fresh ref is created → answers shuffle again
  */
  const shuffledAnswers = useRef();

  /*
    SHUFFLE LOGIC EXPLAINED

    First render of THIS Answers instance:
    - shuffledAnswers.current === undefined
    - We shuffle and store the result

    Subsequent re-renders of the SAME instance:
    - `.current` already exists
    - Condition fails
    - Order remains stable
  */
  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClass = "";

        /*
          answerState drives UI feedback:
          - ''         → initial
          - 'answered' → clicked, waiting
          - 'correct'  → correct answer
          - 'wrong'    → wrong answer
        */
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClass}
              disabled={answerState !== ""} // lock after selection
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
