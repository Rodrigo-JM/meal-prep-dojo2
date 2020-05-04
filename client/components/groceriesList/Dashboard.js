//basically, i need to loop over the required ingredients, for each ingredient, order the time stamps and keep adding
//subtract if there is a grocery haul with same timestamp
//when creating a haul, whenever we go for dealing with a requirement, we have a list for food_ids, and timestamps, like we
//have on the requirements. if they match, we subtract, if result is 0, we are good, if its negative, we have a problem.
//if we don't have a key for that day, then we need to

//we can also have a total of an item, and loop over the requirements. when we reach negative, we flag the timestamp
//we need to display the total needed, first.

//i wanna take all the requirements that have a timestamp greater than today
//i want to check for a an active haul - an active haul is one haul that is not dead
//a dead haul is when all associated timestamps have passed
//when a haul is created, we have the total amount of items.
//we would a have cloud function that would run everytime a grocery haul is created
//that function will go item by item, checking future requirements
//basically, i will check requirements for that item tha have a greater timestamp
//if they have a posive requirement, then subtract that from the total,
//if we can subtract the total amount, get the requirement to 0
//if not, requirement = requirement - what we have on the haul
//and add that to the associated_requirements object
//if a haul is deleted;
//we want to add the associated requirements back to the required_ingredients

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

    this.setState({selectedDate: today})
  }
  createGroceryList() {
    let db = firebase.firestore()

    let bankRef = db.collection('grocery_bank').doc(this.props.grocery_bank.id)

    let haulItems = this.props.total.reduce((h, item) => {
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
    this.setState({selectedDate: new Date(date)})
  }

  render() {
    console.log('props on cl', this.props)
    return (
      <div className="dashboard">
        <div className="dashboard-up">
          <div>
            <ol className="grocery-info-list">
              {this.props.total.length === 0 && (
                <li>
                  <h2>You don't have any requirements for this day!</h2>
                </li>
              )}
              {Object.keys(this.props.ingredients).length &&
                this.props.total.map(ingredient => {
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
              // disabled={this.props.total.length === 0 ? false : true}
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
              mapRequirements={this.props.mapRequirements}
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
