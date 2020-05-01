import React, {Component} from 'react'
import SearchFood from './SearchFood'
import ViewResults from './ViewResults'
import PrepareMeal from './PrepareMeal'
import axios from 'axios'

export default class NewFood extends Component {
  constructor() {
    super()
    this.state = {
      results: [],
      selected: {}
    }

    this.selectFood = this.selectFood.bind(this)
    this.sendResults = this.sendResults.bind(this)
  }

  async selectFood(food) {
    const {data} = await axios.post(
      `https://platform.fatsecret.com/rest/server.api?method=food.get&food_id=${
        food.food_id
      }&format=json`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODgzNTg1NTYsImV4cCI6MTU4ODQ0NDk1NiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.erhUBVdxtH6_0yuQ92vsmqd_8pULyC9XImwU1Shq8jzWPXBiHWsIgvRMb8kkwbo993nnvRRzOXcnFUtsuabhMIHI7tsCMnflwwfTvZAGO72eSYAC3oo13RWb7d8vFXn6shzhG0llanHYMBU2BYoDDwqiy8VQzMzwpo1dEI5RqrQJtr29ksMPwIkahCj0-gUjb_mKiiKPiICY5ZDQOTfsAytT4wfB0CyBLpFI6EMLO7fcfK12L3JUQ1q8RddVyIxlZTYOgpziGFSqYdrBZbvWY_XD-kElFuWzMnOsypRVtdWDf-qeUGA_D0ICU85ago_nibfAgDVQiPn5ScnHM05PjA',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    console.log(data)
    this.setState({selected: data})
    // if (food.tag === "branded") {
    //   const { data } = await axios.get(
    //     `https://trackapi.nutritionix.com/v2/search/item?nix_item_id=${food.id}`,
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-app-key": "6dee1641f74f21c24f192a7da16fd4c0",
    //         "x-app-id": "ea208873",
    //         "x-remote-user-id": "0",
    //       },
    //     }
    //   );
    //   if (!data.foods[0].serving_weight_grams) {
    //     console.log(data.foods[0]);
    //   }
    //   this.setState({ selected: data.foods[0] });
    // } else {
    //   const { data } = await axios.post(
    //     `https://trackapi.nutritionix.com/v2/natural/nutrients`,
    //     { query: food.food_name },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-app-key": "6dee1641f74f21c24f192a7da16fd4c0",
    //         "x-app-id": "ea208873",
    //         "x-remote-user-id": "0",
    //       },
    //     }
    //   );

    // console.log(data);
    // this.setState({ selected: data.foods[0] });
    // }
  }

  sendResults({foods}) {
    // let commonMap = common.map((food) => {
    //   return {
    //     food_name: food.food_name,
    //     serving_unit: food.serving_unit,
    //     tag: "common",
    //     calories: food.nf_calories,
    //   };
    // });

    // let brandedMap = branded.map((food) => {
    //   return {
    //     food_name: food.food_name,
    //     serving_unit: food.serving_unit,
    //     tag: "branded",
    //     id: food.nix_item_id,
    //     calories: food.nf_calories,
    //   };
    // });

    // this.setState({ results: [...brandedMap, ...commonMap] });

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
        <div>
          <SearchFood sendResults={this.sendResults} />
          <ViewResults
            results={this.state.results}
            selectFood={this.selectFood}
          />
        </div>
        <PrepareMeal selected={this.state.selected} />
      </div>
    )
  }
}
