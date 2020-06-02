const MAPPED_TOTAL = 'MAPPED_TOTAL'

const mappedTotal = total => {
  return {
    type: MAPPED_TOTAL,
    total
  }
}

export const mapTotal = (requirements, date = newDateAt0()) => {
  return dispatch => {
    let total = Object.keys(requirements).map(ing => {
      let item_timestamps = requirements[ing]
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
        amount_needed: totalPerItem.toFixed(2)
      }
    })

    total = total.filter(ing => Number(ing.amount_needed) > 0)

    dispatch(mappedTotal(total))
  }
}

const totalReducer = (state = [], action) => {
  switch (action.type) {
    case MAPPED_TOTAL:
      return action.total

    default:
      return state
  }
}

export default totalReducer

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
