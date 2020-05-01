import React, {Component} from 'react'

export default class PrepareMeal extends Component {
  constructor() {
    super()
    this.state = {
      amount: 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      amount: Number(e.target.value)
    })
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
        <label>Food: {this.props.selected.name}</label>
        <form>
          <input
            name="quantity"
            placeholder="Quantity"
            value={
              this.state.amount
                ? this.state.amount
                : this.props.selected.serving_weight_grams
            }
            onChange={this.handleChange}
          />
          <select name="unit" selected>
            <option value="g">grams</option>
          </select>
        </form>
      </div>
    ) : (
      <div />
    )
  }
}
