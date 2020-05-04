import React from 'react'

export default function IngredientsCard(props) {
  return (
    <div className="ingredients-card">
      <h2>Ingredients:</h2>
      <ul>
        {props.ingredients.map((food, index) => {
          return (
            <li key={index}>
              <span>{food.food_name}:</span>
              <span className="ingredient-span">
                {food.food_info.serving} g
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
