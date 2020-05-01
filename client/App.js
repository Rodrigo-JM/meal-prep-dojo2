import React, {Component} from 'react'
import firebase from './firebase'
import NewHaulForm from './components/NewHaulForm'
import NewFood from './components/NewFood'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  getItems(userData) {}

  componentDidMount() {}

  render() {
    return <NewFood />
  }
}
