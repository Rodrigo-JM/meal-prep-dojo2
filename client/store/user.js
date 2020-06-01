const LOG_USER = 'LOG_USER'

const LOGOUT_USER = 'LOGOUT_USER'

export const logUser = user => {
  return {
    type: LOG_USER,
    user
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER
  }
}

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case LOG_USER:
      return action.user
    case LOGOUT_USER:
      return {}
    default:
      return state
  }
}

export default userReducer
