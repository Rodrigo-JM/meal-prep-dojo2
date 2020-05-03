import React, {Component} from 'react'
import NewFoodMain from './NewFoodMain'
import NewMealInfo from './NewMealInfo'
import firebase from 'firebase'

export default class MealContainer extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      totalInfo: {
        calories: 0,
        carb: 0,
        fat: 0,
        protein: 0,
        fiber: 0
      },
      ingredients: []
    }

    this.addIngredient = this.addIngredient.bind(this)
    this.submitMeal = this.submitMeal.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  addIngredient(ingredient) {
    let newIngredients

    if (
      this.state.ingredients.filter(ing => ing.food_id === ingredient.food_id)
        .length
    ) {
      newIngredients = this.state.ingredients.map(ing => {
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
      newIngredients = [...this.state.ingredients, ingredient]
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
    this.setState({
      ingredients: newIngredients,
      totalInfo
    })
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    })
  }
  submitMeal(newMeal) {
    let db = firebase.firestore()

    db.collection('meals').add({
      ...newMeal,
      user_id: this.props.user.uid
    })
  }

  render() {
    return (
      <div>
        <div>
          <h2>Ingredients:</h2>
          <NewFoodMain addIngredient={this.addIngredient} />
        </div>
        <div className="new-meal-container">
          <h2>New Meal</h2>
          <ul className="list-results">
            {this.state.ingredients.map(ingredient => {
              return (
                <li className="food-card" key={ingredient.food_id}>
                  <p>{ingredient.food_name}</p>
                  <p>kcal: {ingredient.food_info.calories}</p>
                  <p>grams: {ingredient.food_info.serving}</p>
                </li>
              )
            })}
          </ul>
          <NewMealInfo totalInfo={this.state.totalInfo} />
          <div>
            <input placeholder="meal name" onChange={this.handleChange} />
            <button
              type="submit"
              onClick={() => {
                if (this.state.ingredients.length) {
                  this.submitMeal(this.state)
                }
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}
