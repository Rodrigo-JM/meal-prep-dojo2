import React, {useState} from 'react'
import firebase from 'firebase'

export default function Auth() {
  const [method, selectMethod] = useState('login')

  const authUser = async evt => {
    evt.preventDefault()
    const email = evt.target.email.value
    const password = evt.target.password.value

    let auth = firebase.auth()
    let user

    if (method === 'login') {
      user = await auth.signInWithEmailAndPassword(email, password)
    } else {
      user = await auth.createUserWithEmailAndPassword(email, password)
    }
  }

  async function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      const {user} = await firebase.auth().signInWithPopup(provider)

      console.log(user)
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <div>
      <span onClick={() => selectMethod('login')}>Log In</span>
      <span onClick={() => selectMethod('signup')}> Sign Up</span>

      <form onSubmit={authUser}>
        <label>E-mail</label>
        <input placeholder="email" name="email" />
        <label>Password</label>
        <input placeholder="password" name="password" />
        <button type="submit">
          {method === 'login' ? 'Log In' : 'Sign Up'}
        </button>
      </form>

      <button type="button" onClick={() => googleLogin()}>
        Or SignUp With Google
      </button>
    </div>
  )
}
