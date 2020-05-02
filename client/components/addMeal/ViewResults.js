import React from 'react'

export default function ViewResults(props) {
  return (
    <ul className="list-results">
      {props.results.map(item => {
        return (
          <li
            key={item.food_id}
            className="food-card"
            onClick={() => props.selectFood(item)}
          >
            <p>{item.name}</p>
          </li>
        )
      })}
    </ul>
  )
}
