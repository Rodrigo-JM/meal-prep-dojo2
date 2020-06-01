/* eslint-disable camelcase */
/* eslint-disable no-extend-native */
import React, {Component} from 'react'
import firebase from './firebase'
import MealContainer from './components/addMeal/MealContainer'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom'
import Calendar from './components/calendar/Calendar'
import Dashboard from './components/groceriesList/Dashboard'
import Navbar from './NavBar'
import {connect} from 'react-redux'

import {setUserDays} from './store/days'
import {setUserGroceryBank} from './store/groceryBank'
import {setUserMeals} from './store/meals'

import Bouncer from 'react-data-bouncer'

class App extends Component {
  constructor() {
    super()
    this.state = {
      removeToggled: false
    }

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
    this.props.setUserDays(this.props.user)

    this.props.setUserGroceryBank(this.props.user)

    this.props.setUserMeals(this.props.user)
  }

  render() {
    console.log(this.state, 'meals')
    return (
      <Bouncer>
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
                    days={this.props.days}
                    meals={this.props.meals}
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
                    days={this.props.days}
                    user={this.props.user}
                    grocery_bank={this.props.grocery_bank}
                    ingredients={this.props.ingredients}
                    toggleRemove={this.toggleRemove}
                    removeToggled={this.state.removeToggled}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      </Bouncer>
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

const mapStateToProps = state => ({
  user: state.user,
  days: state.days,
  grocery_bank: state.grocery_bank,
  meals: state.meals,
  ingredients: state.ingredients
})

const mapDispatchToProps = dispatch => {
  return {
    setUserDays: user => dispatch(setUserDays(user)),
    setUserGroceryBank: user => dispatch(setUserGroceryBank(user)),
    setUserMeals: user => dispatch(setUserMeals(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
