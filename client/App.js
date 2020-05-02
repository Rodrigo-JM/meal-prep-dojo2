/* eslint-disable no-extend-native */
import React, {Component} from 'react'
import firebase from './firebase'
import MealContainer from './components/addMeal/MealContainer'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      meals: [],
      days: []
    }
  }

  componentDidMount() {
    const db = firebase.firestore()

    const userMeals = db.collection('meals').where('user_id', '==', '1')

    userMeals
      .onSnapshot(docs => {
        docs.forEach(doc => {
          console.log(doc.data())
          let newMeals = [...this.state.meals, doc.data()]
          this.setState({meals: newMeals})
        })
      })
      .bind(this)

    let today = new Date()
    today.setHours(0, 0, 0, 0)

    let daysRef = db.collection('days')
    let startedToday = false

    const userDays = daysRef
      .where('user_id', '==', '1')
      .where('timestamp', '>=', today)

    userDays
      .onSnapshot(docs => {
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
          docs.get().then(all => {
            this.setState({days: all})
          })
        }
      })
      .bind(this)
  }

  render() {
    console.log(this.state)
    return <MealContainer />
  }
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}
