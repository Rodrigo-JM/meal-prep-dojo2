import React from 'react'

export default function MealCard(props) {
  return (
    <li>
      <h2>{props.meal.name}</h2>
      <div className="meal-info-card">
        <ul>
          {Object.keys(props.meal.totalInfo).map((info, index) => {
            return (
              <li key={index}>
                {info}: {props.meal.totalInfo[info].toFixed(2)}
              </li>
            )
          })}
        </ul>
      </div>
    </li>
  )
}
