import Header from "./components/Header.jsx";
import Quiz from "./components/Quiz.jsx";

/*
  =================================================
  HIGH-LEVEL APPLICATION FLOW (MENTAL MODEL)
  =================================================

  App
   ├─ Header
   │   └─ Static UI (logo + title)
   │
   └─ Quiz
       ├─ Controls the entire quiz state
       │   - Tracks user answers
       │   - Decides which question is active
       │   - Determines when quiz is complete
       │
       ├─ Question (one at a time)
       │   ├─ QuestionTimer
       │   │   - Handles countdown
       │   │   - Auto-skips unanswered questions
       │   │   - Shows progress bar
       │   │
       │   └─ Answers
       │       - Answers shuffled once using useRef
       │       - Buttons disabled after selection
       │       - Visual feedback (answered / correct / wrong)
       │
       └─ Summary (after last question)
           - Calculates skipped / correct / wrong answers
           - Displays final statistics & review

  FLOW OF DATA (TOP → BOTTOM):
  - App renders Quiz
  - Quiz passes callbacks to Question
  - Question reports answers back to Quiz
  - Quiz decides next question or summary

  KEY IDEA:
  → Quiz is the single source of truth
  → All child components are driven by Quiz state
*/

function App() {
  return (
    <>
      <Header />
      <main>
        <Quiz />
      </main>
    </>
  );
}

export default App;
