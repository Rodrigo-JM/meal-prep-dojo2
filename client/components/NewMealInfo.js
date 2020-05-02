import React from 'react'

export default function NewMealInfo(props) {
  return (
    <div className="new-meal-info">
      <h2>Macros:</h2>
      <ul>
        {Object.keys(props.totalInfo).map((info, index) => {
          return (
            <li key={index}>
              {info}: {props.totalInfo[info].toFixed(2)}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
