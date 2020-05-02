/* eslint-disable no-extend-native */
import React, {Component} from 'react'
import firebase from './firebase'
import MealContainer from './components/addMeal/MealContainer'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Calendar from './components/calendar/Calendar'
export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      meals: [],
      days: [
        {
          meals: [],
          totalInfo: {}
        }
      ]
    }
  }

  componentDidMount() {
    const db = firebase.firestore()

    const userMeals = db.collection('meals').where('user_id', '==', '1')
    userMeals
      .onSnapshot(docs => {
        let newMeals = this.state.meals
        docs.forEach(doc => {
          newMeals = [...newMeals, {...doc.data(), meal_id: doc.id}]
        })
        this.setState({meals: newMeals})
      })
      .bind(this)

    let today = new Date()
    today.setHours(0, 0, 0, 0)

    let daysRef = db.collection('days')
    let startedToday = false

    const userDays = daysRef
      .where('user_id', '==', '1')
      .where('timestamp', '>=', today)
      .orderBy('timestamp', 'asc')

    userDays
      .onSnapshot(docs => {
        let days = []
        if (docs.size === 0) {
          for (let i = 0; i < 30; i++) {
            startedToday = true
            let newDay = new Date(today)
            newDay.setDate(newDay.getDate() + i)

            daysRef.add({
              timestamp: firebase.firestore.Timestamp.fromDate(newDay),
              user_id: '1',
              meals: [],
              totalInfo: {}
            })
          }
        } else if (docs.size > 0 && docs.size < 30 && !startedToday) {
          let lastDay = docs.size
          for (let i = lastDay; i < 30; i++) {
            let newDay = new Date(today)
            newDay.setDate(newDay.getDate() + i)

            daysRef.add({
              timestamp: firebase.firestore.Timestamp.fromDate(newDay),
              user_id: '1',
              meals: [],
              totalInfo: {}
            })
          }
        } else if (docs.size === 30) {
          docs.forEach(doc => {
            days = [...days, {...doc.data(), id: doc.id}]
          })
        }
        this.setState({days})
      })
      .bind(this)
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Calendar
                {...props}
                days={this.state.days}
                meals={this.state.meals}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/meals"
            render={() => <MealContainer user={this.state.user} />}
          />
        </Switch>
      </Router>
    )
  }
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}
