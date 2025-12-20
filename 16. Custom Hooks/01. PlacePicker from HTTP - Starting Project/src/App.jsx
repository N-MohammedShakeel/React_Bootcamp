import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { fetchUserPlaces, updateUserPlaces } from "./http.js";
import Error from "./components/Error.jsx";

/*
  =====================================================================
  CUSTOM HOOKS
  =====================================================================

  WHAT IS A CUSTOM HOOK?
  ---------------------
  A Custom Hook is a normal JavaScript function that:
  - Starts with the prefix "use"
  - Uses one or more built-in React hooks internally
    (useState, useEffect, useCallback, useRef, etc.)
  - Encapsulates reusable, stateful logic
  - Does NOT return JSX (UI), only data and functions

  Custom hooks help separate:
    - Logic (data fetching, timers, side effects)
    - From UI (JSX rendering)

  ---------------------------------------------------------------------

  WHEN SHOULD YOU CREATE A CUSTOM HOOK?
  ------------------------------------
  ✔ When the same useState + useEffect logic appears in multiple components
  ✔ When a component (like App.js) becomes large and hard to read
  ✔ When logic is unrelated to JSX (API calls, subscriptions, timers)
  ✔ When you want cleaner, more maintainable components

  ---------------------------------------------------------------------

  WHEN SHOULD YOU NOT CREATE A CUSTOM HOOK?
  ----------------------------------------
  ✘ If the logic is very small and used only once
  ✘ If the logic is tightly coupled to JSX structure
  ✘ If abstraction makes the code harder to understand

  ---------------------------------------------------------------------

  WHY App.js IS A COMMON PLACE TO IDENTIFY CUSTOM HOOKS?
  -----------------------------------------------------
  App.js usually:
  - Manages shared/global state
  - Handles API calls
  - Coordinates multiple components
  - Contains multiple side effects

  When App.js grows large, it is a strong signal
  that some logic should be extracted into custom hooks.

  ---------------------------------------------------------------------

  POSSIBLE CUSTOM HOOKS FROM THIS FILE (NOT IMPLEMENTED HERE):
  -----------------------------------------------------------
  1) useUserPlaces()
     - Fetch user places
     - Handle loading and error states
     - Update and delete places

  2) useModal()
     - Handle modal open/close state

  3) useOptimisticUpdate()
     - Perform optimistic UI updates
     - Rollback state on API failure

  NOTE:
  These hooks are NOT created here.
  This comment exists only to explain
  when and why custom hooks are used in real projects.
*/

function App() {
  // Stores the place selected for deletion without triggering re-renders
  const selectedPlace = useRef();

  // Stores user-selected places
  const [userPlaces, setUserPlaces] = useState([]);

  // Tracks loading state while fetching user places
  const [isFetching, setIsFetching] = useState(false);

  // Stores fetch-related errors
  const [error, setError] = useState();

  // Stores errors during update/delete operations
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState();

  // Controls delete confirmation modal visibility
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // Fetch user places when App mounts
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchUserPlaces();
        setUserPlaces(places);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch user places." });
      }
      setIsFetching(false);
    }

    fetchPlaces();
  }, []);

  // Opens delete confirmation modal and stores selected place
  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  // Closes delete confirmation modal
  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  // Handles selecting a new place (optimistic UI update)
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
      setUserPlaces(userPlaces); // rollback on failure
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places.",
      });
    }
  }

  // Removes selected place (memoized to avoid unnecessary re-creations)
  const handleRemovePlace = useCallback(
    async function handleRemovePlace() {
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );

      try {
        await updateUserPlaces(
          userPlaces.filter((place) => place.id !== selectedPlace.current.id)
        );
      } catch (error) {
        setUserPlaces(userPlaces); // rollback on failure
        setErrorUpdatingPlaces({
          message: error.message || "Failed to delete place.",
        });
      }

      setModalIsOpen(false);
    },
    [userPlaces]
  );

  // Clears update/delete error state
  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <Error
            title="An error occurred!"
            message={errorUpdatingPlaces.message}
            onConfirm={handleError}
          />
        )}
      </Modal>

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
        {error && <Error title="An error occurred!" message={error.message} />}

        {!error && (
          <Places
            title="I'd like to visit ..."
            fallbackText="Select the places you would like to visit below."
            isLoading={isFetching}
            loadingText="Fetching your places..."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
