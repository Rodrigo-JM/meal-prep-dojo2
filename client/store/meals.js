import firebase from 'firebase'

const SET_MEALS = 'SET_MEALS'
const MAPPED_INGREDIENTS = 'MAPPED_INGREDIENTS'

const setMeals = meals => {
  return {
    type: SET_MEALS,
    meals
  }
}

const mappedIngredients = ingredients => {
  return {
    type: MAPPED_INGREDIENTS,
    ingredients
  }
}

export const setUserMeals = user => {
  return dispatch => {
    const db = firebase.firestore()

    const userMeals = db.collection('meals').where('user_id', '==', user.uid)

    userMeals.onSnapshot(docs => {
      let newMeals = []
      docs.forEach(doc => {
        newMeals = [...newMeals, {...doc.data(), meal_id: doc.id}]
      })

      let allIngredients = newMeals.reduce((ingredients, meal) => {
        meal.ingredients.forEach(ingredient => {
          if (ingredients[ingredient.food_id] === undefined) {
            ingredients[ingredient.food_id] = ingredient
          }
        })

        return ingredients
      }, {})

      dispatch(setMeals(newMeals))
      dispatch(mappedIngredients(allIngredients))
      //   this.setState({meals: newMeals, ingredients: ingredients})
    })
  }
}

const mealsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_MEALS:
      return action.meals
    default:
      return state
  }
}

export default mealsReducer
