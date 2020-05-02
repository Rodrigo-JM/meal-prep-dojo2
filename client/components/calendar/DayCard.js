import React, {Component} from 'react'

const grid = 'abcdefghijklmnopqrstuvwxyzABCD'
export default class DayCard extends Component {
  render() {
    console.log(grid[this.props.index])
    return (
      <div
        className="day-container"
        style={{gridArea: `${grid[this.props.index]}`}}
      >
        <div className="day-card">
          <h2>{this.props.index}</h2>
          {this.props.day.meals.map((meal, index) => (
            <h4 key={index}>
              {meal.name} - {meal.totalInfo.calories.toFixed(2)}
            </h4>
          ))}
        </div>
      </div>
    )
  }
}
