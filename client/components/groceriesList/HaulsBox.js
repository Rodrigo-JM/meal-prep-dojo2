import React from 'react'
import HaulCard from './HaulCard'

export default function HaulsBox(props) {
  console.log(props)
  return (
    <div className="hauls-box-container">
      <ul className="hauls-box-list">
        {props.hauls.map((haul, index) => {
          return (
            <HaulCard
              key={index}
              user={props.user}
              removeToggled={props.removeToggled}
              haul={haul}
              ingredients={props.ingredients}
            />
          )
        })}
      </ul>
    </div>
  )
}
