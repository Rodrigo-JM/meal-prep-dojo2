import React from 'react'

export default function ViewResults(props) {
  return (
    <ul className="list-results">
      {props.results.map(item => {
        return (
          <li className="food-card" onClick={() => props.selectFood(item)}>
            {/* <div className="food-info"> */}
            <p>{item.name}</p>
            {/* <p>serving: {item.serving_unit}</p> */}
            {/* </div> */}
            {/* <h3 className="food-calories">{item.calories}</h3> */}
          </li>
        )
      })}
    </ul>
  )
}
