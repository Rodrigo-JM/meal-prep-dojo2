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
            Number(grocerieBag[ingredient.food_id]) +
            Number(ingredient.food_info.serving)
        }
      })

      return grocerieBag
    }, {})

    const newDayObj = change.after.data()

    let userId = newDayObj.user_id
    let timestamp = `${newDayObj.timestamp._seconds}`
    console.log(timestamp)
    let newRequirement = newDayObj.meals.reduce((grocerieBag, meal) => {
      meal.ingredients.forEach(ingredient => {
        if (grocerieBag[ingredient.food_id] === undefined) {
          grocerieBag[ingredient.food_id] = Number(ingredient.food_info.serving)
        } else {
          grocerieBag[ingredient.food_id] =
            Number(grocerieBag[ingredient.food_id]) +
            Number(ingredient.food_info.serving)
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
          required_ingredients[item.food_id] = {
            [timestamp]: item.change.toFixed(2)
          }
        } else {
          if (required_ingredients[item.food_id][timestamp] === undefined) {
            required_ingredients[item.food_id][timestamp] = item.change.toFixed(
              2
            )
          } else {
            required_ingredients[item.food_id][timestamp] = (
              Number(required_ingredients[item.food_id][timestamp]) +
              Number(item.change)
            ).toFixed(2)
          }
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

exports.updateHaulAssociatedRequirements = functions.firestore
  .document('grocery_bank/{docId}')
  .onUpdate((change, context) => {
    if (change.after.data().hauls.length > change.before.data().hauls.length) {
      let [newHaul] = change.after
        .data()
        .hauls.filter(haul => haul.isActive && !haul.associatedRequirements)

      let requirements = change.after.data().required_ingredients

      newHaul.associatedRequirements = {}
      console.log(newHaul)
      console.log(newHaul.ingredients)

      Object.keys(newHaul.ingredients).forEach(ingredient => {
        let ingredient_in_requirements = Object.keys(requirements[ingredient])
          .filter(time => {
            return Number(time) >= Number(newHaul.timestamp._seconds)
          })
          .sort((a, b) => (a < b ? -1 : 1))

        ingredient_in_requirements.forEach(req => {
          let req_amount = Number(requirements[ingredient][req])
          if (
            req_amount > 0 &&
            Number(newHaul.ingredients[ingredient].amount_needed) > 0
          ) {
            if (
              Number(newHaul.ingredients[ingredient].amount_needed) -
                req_amount >=
              0
            ) {
              if (newHaul.associatedRequirements[ingredient] === undefined) {
                newHaul.associatedRequirements[ingredient] = {
                  [req]: requirements[ingredient][req]
                }
              } else {
                newHaul.associatedRequirements[ingredient][req] =
                  requirements[ingredient][req]
              }

              newHaul.ingredients[ingredient].amount_needed =
                Number(newHaul.ingredients[ingredient].amount_needed) -
                req_amount
              requirements[ingredient][req] = '0.00'
            } else {
              if (newHaul.associatedRequirements[ingredient] === undefined) {
                newHaul.associatedRequirements[ingredient] = {
                  [req]: newHaul.ingredients[ingredient].amount_needed
                }
              } else {
                newHaul.associatedRequirements[ingredient][req] =
                  newHaul.ingredients[ingredient].amount_needed
              }

              newHaul.ingredients[ingredient].amount_needed = '0.00'
              requirements[ingredient][req] =
                req_amount -
                Number(newHaul.ingredients[ingredient].amount_needed)
            }
          }
        })
      })

      let updatedHauls = [
        ...change.after
          .data()
          .hauls.filter(haul => haul.associatedRequirements),
        newHaul
      ]

      let docRef = admin
        .firestore()
        .collection('grocery_bank')
        .doc(context.params.docId)

      return docRef.update({
        hauls: updatedHauls,
        required_ingredients: requirements
      })
    } else if (
      change.after.data().hauls.length < change.before.data().hauls.length
    ) {
      let oldHaul =
        change.after.data().hauls.length > 0
          ? change.before.data().hauls.filter(haul => {
              let presentInPastHauls = change.after
                .data()
                .hauls.find(
                  newHaul =>
                    newHaul.timestamp._seconds === haul.timestamp._seconds
                )

              if (!presentInPastHauls) {
                return true
              } else {
                return false
              }
            })[0]
          : change.before.data().hauls[0]

      console.log(oldHaul)
      let requirements = change.after.data().required_ingredients

      Object.keys(oldHaul.associatedRequirements).forEach(item => {
        let days = Object.keys(oldHaul.associatedRequirements[item])

        days.forEach(day => {
          let amount = Number(oldHaul.associatedRequirements[item][day])
          console.log('item', item)
          console.log('day', day)
          console.log('amount', amount)
          requirements[item][day] = (
            Number(requirements[item][day]) + amount
          ).toFixed(2)
        })
      })

      let docRef = admin
        .firestore()
        .collection('grocery_bank')
        .doc(context.params.docId)

      return docRef.update({
        required_ingredients: requirements
      })
    } else {
      return null
    }
  })
