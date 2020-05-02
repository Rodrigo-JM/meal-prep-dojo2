import React, {useContext} from 'react'
import {useDrag} from 'react-dnd'
import {ItemTypes} from '../../utils/items'
import {DayContext} from './DayCard'

export default function MealCard(props) {
  const [{isDragging}, drag] = useDrag({
    item: {
      type: ItemTypes.MEAL,
      meal: props.meal
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })
  console.log(props)

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
