import React, {Component} from 'react'
import FoodInfoCard from './FoodInfoCard'

export default class PrepareMeal extends Component {
  constructor() {
    super()
    this.state = {
      amount: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({
      amount: Number(e.target.value)
    })
  }

  mapIngredient(ingredient, amount) {
    let newIngredient = {
      food_name: ingredient.food_name,
      food_id: ingredient.food_id
    }

    newIngredient.food_info = Object.keys(ingredient.food_info).reduce(
      (foodInfo, info) => {
        if (info === 'size') {
          foodInfo.serving = amount.toFixed(2)
        } else {
          foodInfo[info.match(/\w+?(?=[_])/g)[0]] = (
            ingredient.food_info[info] * amount
          ).toFixed(2)
        }
        return foodInfo
      },
      {}
    )

    return newIngredient
  }

  handleSubmit(e) {
    e.preventDefault()

    let ingredient = this.mapIngredient(
      this.props.selected,
      this.state.amount
        ? this.state.amount
        : Number(this.props.selected.food_info.size)
    )
    this.props.addIngredient(ingredient)
    this.setState({amount: 0})
  }

  convertValue(from, to) {
    const fromObj = {
      oz: {
        g: 28.35,
        lb: 1 / 16
      },
      g: {
        oz: 1 / 28.35,
        lb: 1 / 454
      },
      lb: {
        oz: 16,
        g: 454
      }
    }

    if (from === to) {
      return 1
    } else {
      return fromObj[from][to]
    }
  }

  render() {
    return this.props.selected.food_name ? (
      <div>
        <label>Food: {this.props.selected.food_name}</label>
        <form onSubmit={this.handleSubmit}>
          <input
            name="quantity"
            placeholder="Quantity"
            value={
              this.state.amount
                ? this.state.amount
                : this.props.selected.food_info.size
            }
            onChange={this.handleChange}
          />
          <select name="unit" selected>
            <option value="g">grams</option>
          </select>
          <button type="submit">Add Food</button>
        </form>
        <FoodInfoCard
          food={this.props.selected}
          amount={
            this.state.amount
              ? this.state.amount
              : Number(this.props.selected.food_info.size)
          }
        />
      </div>
    ) : (
      <div />
    )
  }
}
