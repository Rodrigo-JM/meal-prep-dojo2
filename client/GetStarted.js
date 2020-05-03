import React, {Component, Fragment} from 'react'
import Auth from './Auth'
import firebase from 'firebase'
import App from './App'
export default class GetStarted extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user})
      } else {
        this.setState({user: {}})
      }
    })
  }

  render() {
    console.log(this.state.user)
    return (
      <Fragment>
        {this.state.user.uid ? <App user={this.state.user} /> : <Auth />}
      </Fragment>
    )
  }
}
