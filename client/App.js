/* eslint-disable no-extend-native */
import React, {Component} from 'react'
import firebase from './firebase'
import MealContainer from './components/addMeal/MealContainer'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Calendar from './components/calendar/Calendar'
import Dashboard from './components/groceriesList/Dashboard'
import Navbar from './NavBar'

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
        id: '',
        hauls: [],
        required_ingredients: {}
      },
      ingredients: {},
      total: [],
      removeToggled: false
    }

    this.mapRequirementsToTotal = this.mapRequirementsToTotal.bind(this)
    this.toggleRemove = this.toggleRemove.bind(this)
  }

  async deleteMeal(mealId) {
    const db = firebase.firestore()

    await db
      .collection('meals')
      .doc(mealId)
      .delete()
  }

  toggleRemove() {
    this.setState({removeToggled: !this.state.removeToggled})
  }
  componentDidMount() {
    const db = firebase.firestore()

    const groceryBankRef = db
      .collection('grocery_bank')
      .where('user_id', '==', this.props.user.uid)

    groceryBankRef
      .onSnapshot(docs => {
        let newHauls = []
        let newRequirements = {}
        let id
        docs.forEach(doc => {
          newHauls = doc.data().hauls
          newRequirements = {...doc.data().required_ingredients}
          id = doc.id
        })

        let total = Object.keys(newRequirements).map(ing => {
          let item_timestamps = newRequirements[ing]
          let totalPerItem = Object.keys(item_timestamps).reduce((t, i) => {
            t += Number(item_timestamps[i])
            return t
          }, 0)

          return {
            food_id: ing,
            food_name: 'placeHolder',
            amount_needed: totalPerItem.toFixed(2)
          }
        })
        console.log('total', total)
        this.setState({
          grocery_bank: {
            id: id,
            hauls: newHauls,
            required_ingredients: newRequirements
          },
          total: total
        })
      })
      .bind(this)

    const userMeals = db
      .collection('meals')
      .where('user_id', '==', this.props.user.uid)
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
      .where('user_id', '==', this.props.user.uid)
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
              user_id: this.props.user.uid,
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
              user_id: this.props.user.uid,
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

  mapRequirementsToTotal(date, changeState = null) {
    const required = this.state.grocery_bank.required_ingredients
    console.log(require)
    let total = Object.keys(required).map(ing => {
      let item_timestamps = required[ing]
      let totalPerItem = Object.keys(item_timestamps)
        .filter(required_item_ts => {
          return toDateTime(Number(required_item_ts)) >= date
        })
        .reduce((t, i) => {
          t += Number(item_timestamps[i])
          return t
        }, 0)

      return {
        food_id: ing,
        food_name: this.state.ingredients[ing]
          ? this.state.ingredients[ing].food_name
          : '',
        amount_needed: totalPerItem.toFixed(2)
      }
    })
    if (changeState) {
      this.setState({
        total: [...total.filter(ing => Number(ing.amount_needed) > 0), 'mapped']
      })
    }
    return total.filter(ing => Number(ing.amount_needed) > 0)
  }

  render() {
    console.log(this.state, 'meals')
    return (
      <Router>
        <Navbar />
        <div className="main">
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <Calendar
                  {...props}
                  days={this.state.days}
                  meals={this.state.meals}
                  user={this.props.user}
                  deleteMeal={this.deleteMeal}
                  toggleRemove={this.toggleRemove}
                  removeToggled={this.state.removeToggled}
                />
              )}
            />
            <Route
              path="/meals"
              render={() => <MealContainer user={this.props.user} />}
            />
            <Route
              path="/groceries"
              render={props => (
                <Dashboard
                  {...props}
                  days={this.state.days}
                  user={this.props.user}
                  grocery_bank={this.state.grocery_bank}
                  ingredients={this.state.ingredients}
                  toggleRemove={this.toggleRemove}
                  removeToggled={this.state.removeToggled}
                  total={this.state.total.filter(
                    ing => ing !== 'mapped' && ing.amount_needed !== '0.00'
                  )}
                  mapRequirements={this.mapRequirementsToTotal}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf())
  date.setDate(date.getDate() + days)
  return date
}

function toDateTime(secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}

function newDateAt0() {
  let date = new Date()
  date.setHours(0, 0, 0, 0)

  return date
}
