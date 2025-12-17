import { useRef, useState, useEffect } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

/*
  =================================================
  localStorage WITHOUT useEffect — WHY THIS WORKS
  =================================================

  localStorage access is SYNCHRONOUS and IMMEDIATE.

  Key point:
  - Reading from localStorage does NOT depend on:
    ✔ the DOM
    ✔ browser permissions
    ✔ async operations

  Therefore:
  - It is SAFE to read localStorage
    outside the component
    and during initialization.
*/

/*
  These lines run ONCE when the module is loaded,
  NOT on every render.
*/
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

/*
  Mapping stored IDs to actual place objects
  before React even renders.
*/
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const modal = useRef();
  const selectedPlace = useRef();

  const [availablePlaces, setAvailablePlaces] = useState([]);

  /*
    Initial state is derived from localStorage.

    useEffect is NOT needed here because:
    - This is a one-time synchronous read
    - No re-render coordination is required
  */
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  /*
    useEffect IS needed here because:
    - navigator.geolocation is async
    - Depends on browser permission
    - Must run after component mounts
  */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlaces(sortedPlaces);
    });
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

    /*
      Writing to localStorage INSIDE event handlers:

      - Triggered by explicit user action
      - No need to synchronize with render cycle
      - Perfectly valid without useEffect
    */
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    if (!storedIds.includes(id)) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );

    modal.current.close();

    /*
      Updating localStorage directly after state update:
      - Still fine because this is user-driven logic
      - No dependency on React render timing
    */
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];

    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
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

/*
  =================================================
  SUMMARY — WHEN useEffect IS NOT REQUIRED
  =================================================

  useEffect is NOT mandatory for every side effect.

  You do NOT need useEffect when:
  ✔ Operation is synchronous
  ✔ Triggered by user interaction
  ✔ Does not depend on DOM readiness
  ✔ Does not need re-run synchronization

  localStorage fits perfectly into this category.
*/
