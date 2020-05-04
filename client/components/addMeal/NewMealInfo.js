import React from 'react'

export default function NewMealInfo(props) {
  return (
    <div className="new-meal-info">
      <h2>Macros:</h2>
      <ul className="food-info-list">
        {Object.keys(props.totalInfo).map((info, index) => {
          return (
            <li className="food-info-item" key={index}>
              <span>{info}:</span>{' '}
              <span>{props.totalInfo[info].toFixed(2)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
