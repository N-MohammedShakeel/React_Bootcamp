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
    INITIAL DATA LOAD
    ------------------------------------------------------------

    Fetch opinions once on mount.
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
    UPVOTE — ASYNC + STATE SYNC
    ------------------------------------------------------------

    - Backend is updated first
    - Client state is updated after success
  */
  async function upvoteOpinion(id) {
    const response = await fetch(
      "http://localhost:3000/opinions/" + id + "/upvote",
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      return;
    }

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
    DOWNVOTE — ASYNC + STATE SYNC
    ------------------------------------------------------------
  */
  async function downvoteOpinion(id) {
    const response = await fetch(
      "http://localhost:3000/opinions/" + id + "/downvote",
      {
        method: "POST",
      }
    );

    if (!response.ok) {
      return;
    }

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
