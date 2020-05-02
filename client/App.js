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
      .onSnapshot(doc => {
        const data = doc.data()
        console.log(data)

        this.setState({meals: data})
      })
      .bind(this)
  }

  render() {
    return <MealContainer />
  }
}
