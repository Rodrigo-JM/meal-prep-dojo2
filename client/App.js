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
      ],
      grocery_bank: {
        hauls: [],
        required_ingredients: {}
      },
      ingredients: {}
    }
  }

  componentDidMount() {
    const db = firebase.firestore()

    const groceryBankRef = db
      .collection('grocery_bank')
      .where('user_id', '==', '1')

    groceryBankRef
      .onSnapshot(docs => {
        let newHauls = []
        let newRequirements = {}
        docs.forEach(doc => {
          newHauls = [doc.data().hauls]
          newRequirements = {...doc.data().required_ingredients}
        })

        this.setState({
          grocery_bank: {
            hauls: newHauls,
            required_ingredients: newRequirements
          }
        })
      })
      .bind(this)

    const userMeals = db.collection('meals').where('user_id', '==', '1')
    userMeals
      .onSnapshot(docs => {
        let newMeals = []
        docs.forEach(doc => {
          newMeals = [...newMeals, {...doc.data(), meal_id: doc.id}]
        })

        let ingredients = newMeals.reduce((ingredients, meal) => {
          meal.ingredients.forEach(ingredient => {
            if (ingredients[ingredient.food_id] === undefined) {
              ingredients[ingredient.food_id] = ingredient
            }
          })

          return ingredients
        }, {})

        this.setState({meals: newMeals, ingredients: ingredients})
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
    console.log(this.state, 'meals')
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
