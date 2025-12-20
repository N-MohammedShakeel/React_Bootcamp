export default function Places({
  title,
  places,
  fallbackText,
  onSelectPlace,
  isLoading,
  loadingText,
}) {
  /*
    This component does NOT fetch data
    It only reacts to props passed from parent
  */

  return (
    <section className="places-category">
      <h2>{title}</h2>

      {/* 1️⃣ Loading state */}
      {isLoading && <p className="fallback-text">{loadingText}</p>}

      {/* 2️⃣ No data state */}
      {!isLoading && places.length === 0 && (
        <p className="fallback-text">{fallbackText}</p>
      )}

      {/* 3️⃣ Data available */}
      {!isLoading && places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                <img
                  src={`http://localhost:3000/${place.image.src}`}
                  alt={place.image.alt}
                />
                <h3>{place.title}</h3>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
