import { FORM_TYPES } from './types'

const initialState = {}

export const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FORM_TYPES.ADD_FORM:
      return {
        ...state,
        [action.payload]: {
          formTitle: '',
          questions: [],
        },
      }
    case FORM_TYPES.REMOVE_FORM:
      const newState = { ...state }
      delete newState[action.payload]
      return {
        ...newState,
      }
    case FORM_TYPES.UPDATE_FORM:
      const { formId, formData } = action.payload
      return {
        ...state,
        [formId]: formData,
      }
      case FORM_TYPES.CLEAN_FORMS:
      return {}
    default:
      return state
  }
}
