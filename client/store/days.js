import firebase from 'firebase'

const SET_DAYS = 'SET_DAYS'

const setDays = days => {
  return {
    type: SET_DAYS,
    days
  }
}

export const setUserDays = user => {
  return dispatch => {
    const db = firebase.firestore()

    let today = new Date()
    today.setHours(0, 0, 0, 0)

    let daysRef = db.collection('days')

    const userDays = daysRef
      .where('user_id', '==', user.uid)
      .where('timestamp', '>=', today)
      .orderBy('timestamp', 'asc')

    userDays.onSnapshot(docs => {
      let days = []

      if (docs.size < 30) {
        let lastDay = docs.size
        let newDay = new Date(today)
        newDay.setDate(newDay.getDate() + lastDay)

        daysRef.add({
          timestamp: firebase.firestore.Timestamp.fromDate(newDay),
          user_id: user.uid,
          meals: [],
          totalInfo: {}
        })
      }

      docs.forEach(doc => {
        days = [...days, {...doc.data(), id: doc.id}]
      })
      dispatch(setDays(days))
    })
  }
}

const daysReducer = (state = [], action) => {
  switch (action.type) {
    case SET_DAYS:
      return action.days
    default:
      return state
  }
}

export default daysReducer
