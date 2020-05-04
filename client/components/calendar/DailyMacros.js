import React from 'react'

export default function DailyMacros(props) {
  return (
    <div className="ingredients-card">
      <h2>Daily Macro:</h2>
      <ul className="daily-macros-list">
        {Object.keys(props.totalInfo).map((info, index) => {
          return (
            <li key={index}>
              <span>{info}:</span>
              <span className="ingredient-span">{props.totalInfo[info]} g</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
