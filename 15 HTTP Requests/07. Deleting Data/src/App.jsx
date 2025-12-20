import { useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces } from "./http.js";
import Error from "./components/Error.jsx";

/*
  =================================================
  DELETING WITH OPTIMISTIC UPDATES + ROLLBACK
  =================================================

  This version completes the CRUD cycle by handling DELETE.

  Core goals:
  - Remove item from UI immediately (optimistic delete)
  - Sync deletion with backend
  - Roll back UI if backend update fails
*/

function App() {
  /*
    Stores the place currently selected for deletion
    - useRef avoids re-renders
    - Safe for temporary mutable values
  */
  const selectedPlace = useRef();

  /*
    User-selected places (main UI state)
  */
  const [userPlaces, setUserPlaces] = useState([]);

  /*
    Error state for backend failures
    - If defined → error modal opens
  */
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  /*
    Controls delete confirmation modal visibility
  */
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  /*
    =================================================
    OPTIMISTIC ADD (already covered earlier)
    =================================================
  */
  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }

      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }

      return [selectedPlace, ...prevPickedPlaces];
    });

    try {
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      // Roll back to previous UI state
      setUserPlaces(userPlaces);

      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places.",
      });
    }
  }

  /*
    =================================================
    OPTIMISTIC DELETE WITH BACKEND SYNC
    =================================================

    Why useCallback?
    - Function is passed to child components
    - Prevents unnecessary re-creations
    - Dependency: userPlaces (used for rollback)
  */
  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      /*
        STEP 1: Optimistically remove place from UI
        --------------------------------------------
        User immediately sees the deletion
      */
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      /*
        STEP 2: Try syncing deletion with backend
        -----------------------------------------
        Send updated list without the deleted place
      */
      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        /*
          STEP 3: Rollback UI if backend fails
          -----------------------------------
          Restore the previous list
        */
        setUserPlaces(userPlaces);

        setErrorUpdatingPlaces({
          message: error.message || "Failed to delete place.",
        });
      }

      /*
        Close confirmation modal regardless of outcome
      */
      setModalIsOpen(false);
    },
    [userPlaces] // needed for rollback correctness
  );

  /*
    Clears error state and closes error modal
  */
  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      {/* ERROR MODAL — shown only when an error exists */}
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>

      <main>
        {/* USER-SELECTED PLACES */}
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        {/* AVAILABLE PLACES FROM SERVER */}
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
