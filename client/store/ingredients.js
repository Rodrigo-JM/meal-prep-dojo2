const MAPPED_INGREDIENTS = 'MAPPED_INGREDIENTS'

const ingredientsReducer = (state = {}, action) => {
  switch (action.type) {
    case MAPPED_INGREDIENTS:
      return action.ingredients
    default:
      return state
  }
}

export default ingredientsReducer
