const functions = require('firebase-functions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const admin = require('firebase-admin')

admin.initializeApp(functions.config().firebase)

exports.updateIngredientRequirements = functions.firestore
  .document('days/{dayId}')
  .onUpdate(async (change, context) => {
    const oldDayObj = change.before.data()

    let oldRequirement = oldDayObj.meals.reduce((grocerieBag, meal) => {
      meal.ingredients.forEach(ingredient => {
        if (grocerieBag[ingredient.food_id] === undefined) {
          grocerieBag[ingredient.food_id] = Number(ingredient.food_info.serving)
        } else {
          grocerieBag[ingredient.food_id] =
            grocerieBag[ingredient.food_id] + ingredient.food_info.serving
        }
      })

      return grocerieBag
    }, {})

    const newDayObj = change.after.data()

    let userId = newDayObj.user_id

    let newRequirement = newDayObj.meals.reduce((grocerieBag, meal) => {
      meal.ingredients.forEach(ingredient => {
        if (grocerieBag[ingredient.food_id] === undefined) {
          grocerieBag[ingredient.food_id] = Number(ingredient.food_info.serving)
        } else {
          grocerieBag[ingredient.food_id] =
            grocerieBag[ingredient.food_id] + ingredient.food_info.serving
        }
      })

      return grocerieBag
    }, {})

    let changedItems = Object.keys(newRequirement)

    changedItems = [
      ...changedItems,
      ...Object.keys(oldRequirement).filter(
        old => !Object.keys(newRequirement).includes(old)
      )
    ]

    changedItems = changedItems.map(item_id => {
      let changed =
        (newRequirement[item_id] ? newRequirement[item_id] : 0) -
        (oldRequirement[item_id] ? oldRequirement[item_id] : 0)
      console.log('this is changed', changed)
      return {food_id: item_id, change: changed}
    })

    let bankRef = admin
      .firestore()
      .collection('grocery_bank')
      .where('user_id', '==', userId)

    let userBankRef
    let new_required_ingredients

    let docs = await bankRef.get()

    docs.forEach(doc => {
      let bank = doc.data()

      let required_ingredients = bank.required_ingredients

      changedItems.forEach(item => {
        if (required_ingredients[item.food_id] === undefined) {
          required_ingredients[item.food_id] = item.change.toFixed(2)
        } else {
          required_ingredients[item.food_id] = (
            Number(required_ingredients[item.food_id]) + Number(item.change)
          ).toFixed(2)
        }
      })

      new_required_ingredients = required_ingredients
      userBankRef = doc.id
    })

    let docRef = admin
      .firestore()
      .collection('grocery_bank')
      .doc(userBankRef)

    return docRef.update({
      required_ingredients: new_required_ingredients
    })
  })
