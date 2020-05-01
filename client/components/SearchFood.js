import React, {Component} from 'react'
import axios from 'axios'

export default class SearchFood extends Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    let getData = async () => {
      // const { data } = await axios.get(`https://trackapi.nutritionix.com/v2/search/instant?query=${e.target.value}`, {
      //     headers: {
      //     'Content-Type': 'application/json',
      //     'x-app-key': '6dee1641f74f21c24f192a7da16fd4c0',
      //     'x-app-id': 'ea208873',
      //     'x-remote-user-id': '0'
      // }})

      const {data} = await axios.post(
        `https://platform.fatsecret.com/rest/server.api?method=foods.search&search_expression=${
          e.target.value
        }&format=json&max_results=50`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjQ1MjZBMkFCNkQ0MkQ5REIwMjBEMThBRDMxRTE5MTdCMUUzMjg2RTUiLCJ0eXAiOiJhdCtqd3QiLCJ4NXQiOiJSU2FpcTIxQzJkc0NEUml0TWVHUmV4NHlodVUifQ.eyJuYmYiOjE1ODgzNTg1NTYsImV4cCI6MTU4ODQ0NDk1NiwiaXNzIjoiaHR0cHM6Ly9vYXV0aC5mYXRzZWNyZXQuY29tIiwiYXVkIjoiYmFzaWMiLCJjbGllbnRfaWQiOiI5ZDljMTRlNTU1NzM0YjMzYmJmMmY1ZWU2YmVmMjg2ZSIsInNjb3BlIjpbImJhc2ljIl19.erhUBVdxtH6_0yuQ92vsmqd_8pULyC9XImwU1Shq8jzWPXBiHWsIgvRMb8kkwbo993nnvRRzOXcnFUtsuabhMIHI7tsCMnflwwfTvZAGO72eSYAC3oo13RWb7d8vFXn6shzhG0llanHYMBU2BYoDDwqiy8VQzMzwpo1dEI5RqrQJtr29ksMPwIkahCj0-gUjb_mKiiKPiICY5ZDQOTfsAytT4wfB0CyBLpFI6EMLO7fcfK12L3JUQ1q8RddVyIxlZTYOgpziGFSqYdrBZbvWY_XD-kElFuWzMnOsypRVtdWDf-qeUGA_D0ICU85ago_nibfAgDVQiPn5ScnHM05PjA',
            'Access-Control-Allow-Origin': '*'
          }
        }
      )
      this.props.sendResults(data)
    }
    getData = getData.bind(this)
    getData(e)
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="search food"
          onChange={this.handleChange}
        />
      </div>
    )
  }
}
