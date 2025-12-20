import { useRef, useState, useCallback } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { updateUserPlaces } from "./http.js";

/*
  =================================================
  APP — SENDING DATA TO THE BACKEND (PUT REQUEST)
  =================================================

  This file introduces:
  - Sending data to the server
  - Syncing frontend state with backend data
  - "Optimistic UI updates"

  Important idea:
  → UI state is updated FIRST
  → Backend is updated AFTER
*/

function App() {
  /*
    Holds the place currently selected for deletion
    - useRef avoids unnecessary re-renders
    - Value persists across renders
  */
  const selectedPlace = useRef();

  /*
    State that represents the user's selected places
    - This is the SOURCE OF TRUTH for the UI
  */
  const [userPlaces, setUserPlaces] = useState([]);

  /*
    Controls whether the confirmation modal is open
  */
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /*
    Opens the delete confirmation modal
    and stores which place should be removed
  */
  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  /*
    =================================================
    SELECTING A PLACE (ADD + SEND TO BACKEND)
    =================================================

    This function does TWO things:
    1. Updates React state (UI update)
    2. Sends updated data to backend (PUT request)

    IMPORTANT:
    - We do NOT wait for the backend before updating UI
    - This makes the app feel fast
  */
  async function handleSelectPlace(selectedPlace) {
    /*
      STEP 1: Update local state immediately
      --------------------------------------
      This ensures:
      - UI updates instantly
      - No loading spinner needed here
    */
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }

      // Prevent duplicates
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }

      return [selectedPlace, ...prevPickedPlaces];
    });

    /*
      STEP 2: Sync state with backend
      -------------------------------
      This sends the UPDATED list of places to the server
    */
    try {
      /*
        updateUserPlaces:
        - Sends HTTP PUT request
        - Backend stores the new list
        - No loading state needed because UI already updated
      */
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      /*
        Error handling strategy (simplified here):
        - In real apps you might:
          • revert state
          • show notification
          • retry request
      */
    }
  }

  /*
    =================================================
    REMOVING A PLACE
    =================================================

    - Uses useCallback to keep function reference stable
    - Important when passing to child components / effects
  */
  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    /*
      Update UI state first
      - Immediate feedback
    */
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    /*
      Close modal immediately
    */
    setModalIsOpen(false);

    /*
      NOTE:
      - Backend sync can also be done here (PUT)
      - Same optimistic update pattern applies
    */
  }, []);

  return (
    <>
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
        {/* USER'S SELECTED PLACES */}
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
