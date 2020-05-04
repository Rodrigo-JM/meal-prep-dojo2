import React, {useContext} from 'react'
import {useDrag} from 'react-dnd'
import {ItemTypes} from '../../utils/items'
import {DayContext} from './DayCard'
import IngredientsCard from './IngredientsCard'

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
    <li
      ref={drag}
      opacity={isDragging ? 0.5 : 1}
      className={props.removeMealFromDay ? 'mea-day-card' : 'meal-info-card'}
    >
      {props.deleteMeal &&
        props.removeToggled && (
          <i
            onClick={() => props.deleteMeal(props.meal.meal_id)}
            className="fa fa-minus-square"
          />
        )}
      {props.removeMealFromDay ? (
        <div className="meal-label">
          <h2>{props.meal.name}</h2>
          <i
            onClick={() => props.removeMealFromDay(props.meals)}
            className="fa fa-minus-square"
          />
        </div>
      ) : (
        <h2>{props.meal.name}</h2>
      )}

      {!props.removeMealFromDay && (
        <div className="meal-list">
          <ul>
            {Object.keys(props.meal.totalInfo).map((info, index) => {
              return (
                <li key={index}>
                  <span>{info}:</span>
                  <span>{props.meal.totalInfo[info].toFixed(2)}</span>
                </li>
              )
            })}
          </ul>
        </div>
      )}
      <IngredientsCard ingredients={props.meal.ingredients} />
    </li>
  )
}
