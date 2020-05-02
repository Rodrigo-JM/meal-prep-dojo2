import React, {Component} from 'react'
import NewFoodMain from './NewFoodMain'
import NewMealInfo from './NewMealInfo'

export default class MealContainer extends Component {
  constructor() {
    super()
    this.state = {
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
  }

  addIngredient(ingredient) {
    console.log(ingredient)
    let newIngredients = [...this.state.ingredients, ingredient]

    let totalInfo = newIngredients.reduce(
      (total, ingredient) => {
        Object.keys(ingredient.food_info)
          .filter(key => key !== 'serving')
          .forEach(info => {
            total[info] = total[info] + Number(ingredient.food_info[info])
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

  submitMeal() {}

  render() {
    console.log(this.state)
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
        </div>
      </div>
    )
  }
}
