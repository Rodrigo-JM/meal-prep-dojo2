import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCfvI9CiB11orJ7pf_fAV16BNV7y-p96c0',
  authDomain: 'meal-prep-dojo.firebaseapp.com',
  databaseURL: 'https://meal-prep-dojo.firebaseio.com',
  projectId: 'meal-prep-dojo',
  storageBucket: 'meal-prep-dojo.appspot.com',
  messagingSenderId: '448958334562',
  appId: '1:448958334562:web:1191ca0198ad93b193733b',
  measurementId: 'G-4SQPDW2V5G'
}

//initialize Firebase
firebase.initializeApp(config)

export default firebase
