import React, {Component} from 'react'
import {connect} from 'react-redux'
import Auth from './Auth'
import firebase from 'firebase'
import App from './App'
import {logUser, logoutUser} from './store/user'
// @ts-ignore
import Bouncer from 'react-data-bouncer'

class GetStarted extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.logUser(user)
      } else {
        this.props.logoutUser()
      }
    })
  }

  render() {
    return (
      <Bouncer>
        {this.props.user.uid ? <App user={this.props.user} /> : <Auth />}
      </Bouncer>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => {
  return {
    logUser: user => dispatch(logUser(user)),
    logoutUser: () => dispatch(logoutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GetStarted)
