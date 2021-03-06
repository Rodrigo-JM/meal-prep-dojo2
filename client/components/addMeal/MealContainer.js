import React, {Component} from 'react'
import NewFoodMain from './NewFoodMain'
import NewMealInfo from './NewMealInfo'
import firebase from 'firebase'

export default class MealContainer extends Component {
  constructor() {
    super()
    this.state = {
      meal: {
        name: '',
        totalInfo: {
          calories: 0,
          carb: 0,
          fat: 0,
          protein: 0,
          fiber: 0
        },
        ingredients: []
      },
      submitted: false
    }

    this.addIngredient = this.addIngredient.bind(this)
    this.removeIngredient = this.removeIngredient.bind(this)
    this.submitMeal = this.submitMeal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  removeIngredient(ingredient) {
    let newIngredients = this.state.meal.ingredients.filter(
      ing => ing.food_id !== ingredient.food_id
    )

    let totalInfo = newIngredients.reduce(
      (total, i) => {
        Object.keys(i.food_info)
          .filter(key => key !== 'serving')
          .forEach(info => {
            total[info] = total[info] + Number(i.food_info[info])
          })

        return total
      },
      {
        calories: 0,
        carb: 0,
        fat: 0,
        protein: 0,
        fiber: 0
      }
    )

    let mealchange = {
      ...this.state.meal,
      ingredients: newIngredients,
      totalInfo
    }

    this.setState({
      meal: mealchange
    })
  }

  addIngredient(ingredient) {
    let newIngredients

    if (
      this.state.meal.ingredients.filter(
        ing => ing.food_id === ingredient.food_id
      ).length
    ) {
      newIngredients = this.state.meal.ingredients.map(ing => {
        if (ing.food_id === ingredient.food_id) {
          return {
            ...ing,
            food_info: {
              ...ing.food_info,
              serving: (
                Number(ing.food_info.serving) +
                Number(ingredient.food_info.serving)
              ).toFixed(2)
            }
          }
        }
        return ing
      })
    } else {
      newIngredients = [...this.state.meal.ingredients, ingredient]
    }

    let totalInfo = newIngredients.reduce(
      (total, i) => {
        Object.keys(i.food_info)
          .filter(key => key !== 'serving')
          .forEach(info => {
            total[info] = total[info] + Number(i.food_info[info])
          })

        return total
      },
      {
        calories: 0,
        carb: 0,
        fat: 0,
        protein: 0,
        fiber: 0
      }
    )
    let mealchange = {
      ...this.state.meal,
      ingredients: newIngredients,
      totalInfo
    }
    this.setState({
      meal: mealchange
    })
  }

  handleChange(e) {
    let meal = {
      ...this.state.meal,
      name: e.target.value
    }
    this.setState({
      meal: meal
    })
  }
  submitMeal(newMeal) {
    let db = firebase.firestore()

    this.setState({submitted: true})
    db.collection('meals').add({
      ...newMeal,
      user_id: this.props.user.uid
    })
  }

  render() {
    return (
      <div className="meal-section">
        <div className="meal-section-up">
          <NewFoodMain addIngredient={this.addIngredient} />
        </div>
        <div className="meal-section-down">
          <div className="new-meal-list">
            <h2>New Meal</h2>
            <ul className="list-results">
              {this.state.meal.ingredients.map(ingredient => {
                return (
                  <li className="food-card" key={ingredient.food_id}>
                    <p>{ingredient.food_name}</p>
                    <p>kcal: {ingredient.food_info.calories}</p>
                    <p>grams: {ingredient.food_info.serving}</p>

                    <button
                      onClick={() => this.removeIngredient(ingredient)}
                      type="submit"
                    >
                      Remove
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="new-meal-info">
            <h2>Meal Name:</h2>
            <div className="new-meal-mini-form">
              <input placeholder="meal name" onChange={this.handleChange} />
              <button
                type="submit"
                onClick={() => {
                  if (this.state.meal.ingredients.length) {
                    this.submitMeal(this.state.meal)
                  }
                }}
              >
                Submit
              </button>
            </div>
            <NewMealInfo totalInfo={this.state.meal.totalInfo} />
          </div>
        </div>
      </div>
    )
  }
}
