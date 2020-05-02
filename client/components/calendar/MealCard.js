import React from 'react'
import {useDrag} from 'react-dnd'
import {ItemTypes} from '../../utils/items'

export default function MealCard(props) {
  const [{isDragging}, drag] = useDrag({
    item: {
      type: ItemTypes.MEAL
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  return (
    <li ref={drag} opacity={isDragging ? 0.5 : 1}>
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
