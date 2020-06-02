import firebase from 'firebase'
import {mapTotal} from './total'

const SET_GROCERY_BANK = 'SET_GROCERY_BANK'

const setGroceryBank = groceryBank => {
  return {
    type: SET_GROCERY_BANK,
    groceryBank
  }
}

export const setUserGroceryBank = user => {
  return dispatch => {
    const db = firebase.firestore()

    const groceryBankRef = db
      .collection('grocery_bank')
      .where('user_id', '==', user.uid)

    groceryBankRef.onSnapshot(docs => {
      let newHauls = []
      let newRequirements = {}
      let id

      docs.forEach(doc => {
        newHauls = doc.data().hauls
        newRequirements = {...doc.data().required_ingredients}
        id = doc.id
      })

      dispatch(
        setGroceryBank({
          id: id,
          hauls: newHauls,
          required_ingredients: newRequirements
        })
      )

      dispatch(mapTotal(newRequirements))
    })
  }
}

let initialState = {
  hauls: [],
  required_ingredients: {},
  id: ''
}

const groceryBankReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_GROCERY_BANK:
      return action.groceryBank
    default:
      return state
  }
}

export default groceryBankReducer
