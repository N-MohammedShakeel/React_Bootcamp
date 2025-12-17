import { useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";

function App() {
  // Refs are used for IMPERATIVE side effects (opening / closing modal)
  const modal = useRef();
  const selectedPlace = useRef();

  // State controls UI rendering (pure React state)
  const [pickedPlaces, setPickedPlaces] = useState([]);

  /*
    ================================
    WHAT ARE SIDE EFFECTS?
    ================================

    A side effect is anything that:
    - Interacts with the outside world
    - Does NOT directly compute JSX

    Examples:
    - Accessing DOM elements
    - Opening / closing modals
    - Timers
    - Browser APIs (geolocation, localStorage)
    - Network requests
  */

  function handleStartRemovePlace(id) {
    // Imperative DOM-related side effect
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
    // Pure state update (NOT a side effect)
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }

      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    // Side effect: closing modal
    modal.current.close();
  }

  return (
    <>
      {/* Modal controlled via refs (imperative side effect) */}
      <Modal ref={modal}>
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
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <Places
          title="Available Places"
          places={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
