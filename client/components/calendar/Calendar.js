// firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),

import React, {Component} from 'react'
import DayCard from './DayCard'
import MealsBox from './MealsBox'
export default class Calendar extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <div className="planner-nav">
          <h2>Planner</h2>
          <p className="message-planner">
            Drag and drop meals into your calendar
          </p>
          <i
            className="fa fa-minus-square"
            onClick={() => this.props.toggleRemove()}
          />
          <i
            onClick={() => this.props.history.push('/meals')}
            className="fa fa-plus-square add-meal-icon"
          />
        </div>
        <div>
          <MealsBox
            removeToggled={this.props.removeToggled}
            meals={this.props.meals}
            deleteMeal={this.props.deleteMeal}
          />
        </div>

        <div className="calendar-grid">
          {this.props.days.map((day, index) => {
            return <DayCard key={day.id} index={index} day={day} />
          })}
        </div>
      </div>
    )
  }
}
