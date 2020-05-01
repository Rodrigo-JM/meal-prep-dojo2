import React, {Component} from 'react'

export default class NewHaulForm extends Component {
  constructor() {
    super()
    this.state = {
      Date: new Date.now().setHours(0, 0, 0, 0),
      items: []
    }

    this.addItem = this.addItem.bind(this)
  }

  addItem() {}

  render() {
    return <div />
  }
}
