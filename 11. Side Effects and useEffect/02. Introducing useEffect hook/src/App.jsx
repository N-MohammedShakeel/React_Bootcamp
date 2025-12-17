import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

/*
  =================================================
  useEffect — Core Idea (Quick Revision)
  =================================================

  useEffect is a React Hook that runs code
  AFTER the component has rendered.

  Why it exists:
  - Rendering must stay pure (JSX only)
  - External systems (browser APIs) cannot be used during render
  - useEffect runs AFTER React commits changes to the DOM

  Rule of thumb:
  → If code depends on the browser, device, or environment,
    it belongs in useEffect.
*/

/*
  =================================================
  Browser APIs — Context
  =================================================

  Browser APIs are provided by the browser runtime,
  not by JavaScript or React.

  Examples (high-level):
  - navigator      → device & browser info
  - localStorage   → persistent storage
  - fetch          → HTTP requests
  - setTimeout     → timers

  In THIS file, we use:
  → navigator.geolocation
*/

/*
  =================================================
  navigator.geolocation — Specific API Used Here
  =================================================

  Purpose:
  - Access user's physical location

  Common method:
  navigator.geolocation.getCurrentPosition()

  Syntax:
  navigator.geolocation.getCurrentPosition(
    successCallback,
    errorCallback?,   // optional
    options?          // optional
  )

  Behavior:
  - Asks user for permission
  - Runs asynchronously
  - Returns a `position` object
*/

function App() {
  const modal = useRef();
  const selectedPlace = useRef();

  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState([]);

  useEffect(() => {
    // Browser API call → must run AFTER initial render
    navigator.geolocation.getCurrentPosition((position) => {
      // Accessing coordinates from the position object
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      // Updating state based on browser-provided data
      setAvailablePlaces(sortedPlaces);
    });

    // Empty dependency array:
    // → run once when the component mounts
  }, []);

  function handleStartRemovePlace(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    modal.current.close();
  }

  function handleSelectPlace(id) {
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
    modal.current.close();
  }

  return (
    <>
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
          places={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
