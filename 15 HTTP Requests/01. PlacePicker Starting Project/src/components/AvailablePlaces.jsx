/*
  This component is just a wrapper.
  It will later fetch data from the backend.
*/
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
  return (
    <Places
      title="Available Places"
      places={[]} // currently empty
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
