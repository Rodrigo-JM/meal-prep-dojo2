import React from 'react'

export default function FoodInfoCard(props) {
  const filterKeys = props.food.food_info
    ? Object.keys(props.food.food_info).filter(key => key !== 'size')
    : []
  console.log(props)
  return (
    <ul>
      {filterKeys.map((info, index) => {
        return (
          <li key={props.food && props.food.food_id + index}>
            {info.match(/\w+?(?=[_])/g)[0]}:{' '}
            {(props.food.food_info[info] * props.amount).toFixed(2)}
          </li>
        )
      })}
    </ul>
  )
}
