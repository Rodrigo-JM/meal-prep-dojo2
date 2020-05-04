import React from 'react'
import firebase from 'firebase'

export default function HaulCard(props) {
  const deleteHaul = async haul => {
    const db = firebase.firestore()

    let bankRef = db
      .collection('grocery_bank')
      .where('user_id', '==', props.user.uid)

    let groceryB = await bankRef.get()

    groceryB.forEach(doc => {
      let {hauls} = doc.data()

      let newHauls = hauls.filter(
        h => h.timestamp.seconds !== haul.timestamp.seconds
      )

      db
        .collection('grocery_bank')
        .doc(doc.id)
        .update({
          hauls: newHauls
        })
    })
  }

  return (
    <li className="grocery-list">
      {props.removeToggled && (
        <i
          onClick={() => deleteHaul(props.haul)}
          className="fa fa-minus-square"
        />
      )}
      <h2>
        {props.haul.timestamp
          ? toDateTime(props.haul.timestamp)
              .toDateString()
              .slice(0, -5)
          : ''}
      </h2>
      <ul>
        {props.haul.associatedRequirements &&
        Object.keys(props.ingredients).length
          ? Object.keys(props.haul.ingredients).map(ingredient => {
              let total = Object.keys(
                props.haul.associatedRequirements[ingredient]
              ).reduce((total, date) => {
                total += Number(
                  props.haul.associatedRequirements[ingredient][date]
                )

                return total
              }, 0)

              return (
                <li key={ingredient.food_id}>
                  <span className="grocery-item">
                    {props.ingredients[ingredient].food_name}:
                  </span>{' '}
                  <span>{total}g</span>
                </li>
              )
            })
          : ''}
      </ul>
    </li>
  )
}

function toDateTime(secs) {
  var t = new Date(1970, 0, 1) // Epoch
  t.setSeconds(secs)
  return t
}
