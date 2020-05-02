import React, {Component} from 'react'
import firebase from './firebase'
import NewHaulForm from './components/NewHaulForm'
import NewFoodMain from './components/NewFoodMain'
import MealContainer from './components/MealContainer'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {},
      meals: []
    }
  }

  getItems(userData) {}

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
  }

  render() {
    console.log(this.state)
    return <MealContainer />
  }
}
