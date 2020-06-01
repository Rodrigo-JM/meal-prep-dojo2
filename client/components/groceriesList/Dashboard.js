import React, {Component} from 'react'
import firebase from 'firebase'
import {DatePicker} from './DatePicker'
import HaulsBox from './HaulsBox'
export default class Dashboard extends Component {
  constructor() {
    super()
    this.state = {
      total: [],
      selectedDate: {}
    }
    this.setDate = this.setDate.bind(this)
    this.createGroceryList = this.createGroceryList.bind(this)
  }

  componentDidMount() {
    let today = newDateAt0()

    this.setState({
      selectedDate: today,
      total: this.mapRequirementsToTotal(today)
    })
  }

  mapRequirementsToTotal(date) {
    const required = this.props.grocery_bank.required_ingredients

    let total = Object.keys(required).map(ing => {
      let item_timestamps = required[ing]
      let totalPerItem = Object.keys(item_timestamps)
        .filter(required_item_ts => {
          return toDateTime(Number(required_item_ts)) >= date
        })
        .reduce((t, i) => {
          t += Number(item_timestamps[i])
          return t
        }, 0)

      return {
        food_id: ing,
        food_name: this.state.ingredients[ing]
          ? this.state.ingredients[ing].food_name
          : '',
        amount_needed: totalPerItem.toFixed(2)
      }
    })

    return total.filter(ing => Number(ing.amount_needed) > 0)
  }

  createGroceryList() {
    let db = firebase.firestore()

    let bankRef = db.collection('grocery_bank').doc(this.props.grocery_bank.id)

    let haulItems = this.state.total.reduce((h, item) => {
      h[item.food_id] = item

      return h
    }, {})

    let haulTimestamp = this.state.selectedDate

    haulTimestamp.setHours(0, 0, 0, 0)

    let haul = {
      timestamp: firebase.firestore.Timestamp.fromDate(haulTimestamp),
      ingredients: haulItems,
      isActive: true
    }

    bankRef.update({
      hauls: firebase.firestore.FieldValue.arrayUnion(haul)
    })
  }

  setDate(date) {
    this.setState({
      selectedDate: new Date(date),
      total: this.mapRequirementsToTotal(date)
    })
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-up">
          <div>
            <ol className="grocery-info-list">
              {this.state.total.length === 0 && (
                <li>
                  <h2>You don't have any requirements for this day!</h2>
                </li>
              )}
              {Object.keys(this.props.ingredients).length &&
                this.state.total.map(ingredient => {
                  console.log('ingre', ingredient)
                  if (ingredient === 'mapped') return ''
                  if (!this.props.ingredients[ingredient.food_id]) return ''
                  console.log(ingredient)
                  return (
                    <li className="food-info-item" key={ingredient.food_id}>
                      {this.props.ingredients[ingredient.food_id].food_name} -{' '}
                      {ingredient.amount_needed}g
                    </li>
                  )
                })}
            </ol>
            <button
              // disabled={this.state.total.length === 0 ? false : true}
              type="submit"
              className="create-grocery-button"
              onClick={() => this.createGroceryList()}
            >
              Create Groceries List
            </button>
          </div>
          <div>
            <DatePicker
              setDate={this.setDate}
              hauls={this.props.grocery_bank.hauls}
              mapRequirements={this.mapRequirements}
            />
          </div>
        </div>
        <div className="dashboard-down">
          <div className="planner-nav">
            <h2>Your Groceries Lists</h2>
            <i
              className="fa fa-minus-square"
              onClick={() => this.props.toggleRemove()}
            />
          </div>
          <HaulsBox
            user={this.props.user}
            hauls={this.props.grocery_bank.hauls}
            ingredients={this.props.ingredients}
            removeToggled={this.props.removeToggled}
          />
        </div>
      </div>
    )
  }
}

function toDateTime(secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}

function newDateAt0() {
  let date = new Date()
  date.setHours(0, 0, 0, 0)

  return date
}
