/*
  Generic list-rendering component
  Used for:
  - Available places
  - User-selected places
*/
export default function Places({ title, places, fallbackText, onSelectPlace }) {
  return (
    <section className="places-category">
      <h2>{title}</h2>

      {/* If no data yet */}
      {places.length === 0 && <p className="fallback-text">{fallbackText}</p>}

      {/* Render list if data exists */}
      {places.length > 0 && (
        <ul className="places">
          {places.map((place) => (
            <li key={place.id} className="place-item">
              <button onClick={() => onSelectPlace(place)}>
                {/* 
                  Image is loaded from BACKEND server
                  Backend serves images from /images folder
                */}
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
