/*
  ------------------------------------------------------------
  MEAL ITEM COMPONENT
  ------------------------------------------------------------

  Purpose:
  --------
  - Render a single meal
  - Display image, name, price, description
  - Provide an "Add to Cart" action

  This is a PRESENTATIONAL component:
  - No state
  - No side effects
  - Receives all data via props
*/

export default function MealItem({ meal }) {
  return (
    <li className="meal-item">
      <article>
        {/*
          Image URL points to backend static files.
          express.static('public') makes this work.
        */}
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />

        <div>
          <h3>{meal.name}</h3>

          {/*
            Price formatting will be improved later.
          */}
          <p className="meal-item-price">{meal.price}</p>

          <p className="meal-item-description">{meal.description}</p>
        </div>

        {/*
          Action area.
          This button will later:
          - add items to cart
          - trigger form / state logic
        */}
        <p className="meal-item-actions">
          <button>Add to Cart</button>
        </p>
      </article>
    </li>
  );
}
