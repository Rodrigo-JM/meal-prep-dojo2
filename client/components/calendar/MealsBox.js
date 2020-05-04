import React from 'react'
import MealCard from './MealCard'

export default function MealsBox(props) {
  return (
    <div className="meals-box-container">
      <ul className="meals-box-list">
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
