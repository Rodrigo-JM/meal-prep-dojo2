/* eslint-disable camelcase */
import React, {Component} from 'react'
import SearchFood from './SearchFood'
import ViewResults from './ViewResults'
import PrepareMeal from './PrepareMeal'
import axios from 'axios'

export default class NewFoodMain extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      selected: {}
    }

    this.selectFood = this.selectFood.bind(this)
    this.sendResults = this.sendResults.bind(this)
  }

  async selectFood(item) {
    const {data} = await axios.get(`/api/select/${item.food_id}`)
    const {food} = JSON.parse(data)
    const mapInfo = food => {
      let serving
      if (Array.isArray(food.servings.serving)) {
        serving = food.servings.serving.find(f => f.metric_serving_unit === 'g')
      } else {
        serving = food.servings.serving
      }
      console.log(serving)
      serving = {
        calories_per_gram:
          Number(serving.calories) / Number(serving.metric_serving_amount),
        carb_per_gram:
          Number(serving.carbohydrate) / Number(serving.metric_serving_amount),
        fat_per_gram:
          Number(serving.fat) / Number(serving.metric_serving_amount),
        protein_per_gram:
          Number(serving.protein) / Number(serving.metric_serving_amount),
        fiber_per_gram:
          Number(serving.fiber) / Number(serving.metric_serving_amount),
        size: Number(serving.metric_serving_amount)
      }

      return serving
    }

    this.setState({
      selected: {
        food_info: mapInfo(food),
        food_name: food.food_name,
        food_id: food.food_id
      }
    })
  }

  sendResults(data) {
    console.log('data', data)
    console.log('type', typeof data)
    const {foods} = JSON.parse(data)

    let foodsArr = foods.food.map(food => {
      return {
        food_id: food.food_id,
        name: food.food_name
      }
    })

    this.setState({results: foodsArr})
  }
  render() {
    return (
      <div className="new-food-menu">
        <div className="new-ingredient-search">
          <h2>Ingredients:</h2>
          <SearchFood sendResults={this.sendResults} />
          <ViewResults
            results={this.state.results}
            selectFood={this.selectFood}
          />
        </div>
        <div className="ingredient-board">
          <h2>Ingredient Macros</h2>
          <PrepareMeal
            addIngredient={this.props.addIngredient}
            selected={this.state.selected}
          />
        </div>
      </div>
    )
  }
}
