import React from 'react'

export default function FoodInfoCard(props) {
  const filterKeys = props.food.food_info
    ? Object.keys(props.food.food_info).filter(key => key !== 'size')
    : []
  console.log(props)
  return (
    <ul className="food-info-list">
      {filterKeys.map((info, index) => {
        return (
          <li
            className="food-info-item"
            key={props.food && props.food.food_id + index}
          >
            <span>{info.match(/\w+?(?=[_])/g)[0]}: </span>
            <span>
              {(props.food.food_info[info] * props.amount).toFixed(2)}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
