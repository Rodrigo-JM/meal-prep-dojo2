// firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),

import React, {Component} from 'react'
import DayCard from './DayCard'
import MealsBox from './MealsBox'
export default class Calendar extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        <div>
          <MealsBox meals={this.props.meals} />
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
