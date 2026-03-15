import { createContext, useEffect, useState } from "react";

export const OpinionsContext = createContext({
  opinions: null,
  addOpinion: (opinion) => {},
  upvoteOpinion: (id) => {},
  downvoteOpinion: (id) => {},
});

export function OpinionsContextProvider({ children }) {
  const [opinions, setOpinions] = useState();

  /*
    ------------------------------------------------------------
    INITIAL DATA FETCH
    ------------------------------------------------------------

    Loads all opinions when the app starts.
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
    ------------------------------------------------------------
    ADD OPINION
    ------------------------------------------------------------
  */
  async function addOpinion(enteredOpinionData) {
    const response = await fetch("http://localhost:3000/opinions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(enteredOpinionData),
    });

    if (!response.ok) {
      return;
    }

    const savedOpinion = await response.json();
    setOpinions((prevOpinions) => [savedOpinion, ...prevOpinions]);
  }

  /*
    ------------------------------------------------------------
    UPVOTE (CLIENT-SIDE STATE UPDATE)
    ------------------------------------------------------------

    This will later be triggered by:
      upvoteAction → context.upvoteOpinion(id)
  */
  function upvoteOpinion(id) {
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes + 1 };
        }
        return opinion;
      });
    });
  }

  /*
    ------------------------------------------------------------
    DOWNVOTE (CLIENT-SIDE STATE UPDATE)
    ------------------------------------------------------------
  */
  function downvoteOpinion(id) {
    setOpinions((prevOpinions) => {
      return prevOpinions.map((opinion) => {
        if (opinion.id === id) {
          return { ...opinion, votes: opinion.votes - 1 };
        }
        return opinion;
      });
    });
  }

  const contextValue = {
    opinions,
    addOpinion,
    upvoteOpinion,
    downvoteOpinion,
  };

  return <OpinionsContext value={contextValue}>{children}</OpinionsContext>;
}
