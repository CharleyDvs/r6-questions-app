import { USER_TYPES } from './types'

const initialState = {}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_TYPES.SUBSCRIBE_USER:
      const { payload } = action
      return {
        ...payload,
      }
    case USER_TYPES.UNSUBSCRIBE_USER:
      return {}
    default:
      return state
  }
}
