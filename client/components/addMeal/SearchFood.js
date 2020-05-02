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
      const {data} = await axios.get(`/api/search/${e.target.value}`)

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
