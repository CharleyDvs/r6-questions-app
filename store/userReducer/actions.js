import { USER_TYPES } from './types'

export const subscribeUser = (userData) => ({
  type: USER_TYPES.SUBSCRIBE_USER,
  payload: userData,
})

export const unsubscribeUser = () => ({
  type: USER_TYPES.UNSUBSCRIBE_USER,
})
