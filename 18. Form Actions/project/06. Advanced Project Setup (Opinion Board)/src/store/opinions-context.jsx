import { createContext, useEffect, useState } from "react";

/*
  Context provides:
    - opinions data
    - functions to mutate opinions
*/
export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: () => {},
  upvoteOpinion: () => {},
  downvoteOpinion: () => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  /*
    Load opinions once on app start
  */
  useEffect(() => {
    async function loadOpinions() {
      const response = await fetch("http://localhost:3000/opinions");
      const opinions = await response.json();
      setOpinions(opinions);
    }

    loadOpinions();
  }, []);

  /*
    Create opinion (POST)
  */
  async function addOpinion(enteredOpinionData) {
    const response = await fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prev) => [savedOpinion, ...prev]);
  }

  /*
    Optimistic UI updates for votes
  */
  function upvoteOpinion(id) {
    setOpinions((prev) =>
      prev.map((op) => (op.id === id ? { ...op, votes: op.votes + 1 } : op))
    );
  }

  function downvoteOpinion(id) {
    setOpinions((prev) =>
      prev.map((op) => (op.id === id ? { ...op, votes: op.votes - 1 } : op))
    );
  }

  return (
    <OpinionsContext
      value={{ opinions, addOpinion, upvoteOpinion, downvoteOpinion }}
    >
      {children}
    </OpinionsContext>
  );
}
