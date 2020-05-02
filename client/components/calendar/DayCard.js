import React, {createContext} from 'react'
import {useDrop} from 'react-dnd'
import {ItemTypes} from '../../utils/items'
import MealCard from './MealCard'
import firebase from 'firebase'
const grid = 'abcdefghijklmnopqrstuvwxyzABCD'

const DayCard = props => {
  const updateDaysMeals = ({meal}) => {
    const db = firebase.firestore()

    const dayRef = db.collection('days').doc(props.day.id)

    let newMeals = [...props.day.meals, meal]
    let newTotalInfo = newMeals.reduce(
      (total, meal) => {
        Object.keys(meal.totalInfo).forEach(info => {
          total[info] = total[info] + meal.totalInfo[info]
        })

        return total
      },
      {
        calories: 0,
        carb: 0,
        fat: 0,
        protein: 0,
        fiber: 0
      }
    )

    dayRef.update({
      meals: newMeals,
      totalInfo: newTotalInfo
    })
  }

  const [{isOver}, drop] = useDrop({
    accept: ItemTypes.MEAL,
    drop: (item, monitor) => updateDaysMeals(item),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <div
      className="day-container"
      style={{
        // gridArea: `${grid[props.index]}`,
        backgroundColor: isOver ? 'gray' : 'white'
      }}
      ref={drop}
    >
      <div className="day-card">
        <h2>{props.index}</h2>
        {props.day.meals.map((meal, index) => {
          console.log(meal)
          return <MealCard key={meal.id} meal={meal} />
        })}
      </div>
    </div>
  )
}

export default DayCard
