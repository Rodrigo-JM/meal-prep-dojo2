import React from 'react'
import MealCard from './MealCard'

export default function MealsBox(props) {
  return (
    <div className="meals-box-container">
      <ul className="meals-box-list">
        {props.meals.length === 0 && (
          <h2>
            You don't have any meals, go into your meals tab and create one!
          </h2>
        )}
        {props.meals.map((meal, index) => {
          return (
            <MealCard
              key={index}
              removeToggled={props.removeToggled}
              meal={meal}
              deleteMeal={props.deleteMeal}
            />
          )
        })}
      </ul>
    </div>
  )
}
