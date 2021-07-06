import { FORM_TYPES } from './types'

export const addForm = () => async (dispatch) => {
  const response = await fetch(
    'https://r6-questions-app-1.vercel.app/api/forms/create'
  )
  const data = await response.json()
  const formId = data._id
  dispatch({
    type: FORM_TYPES.ADD_FORM,
    payload: formId,
  })
}

export const fetchForms = (userId) => async (dispatch) => {
  const response = await fetch(
    `https://r6-questions-app-1.vercel.app/api/user/${userId}`
  )
  const data = await response.json()
  dispatch({
    type: FORM_TYPES.FETCH_FORMS,
    payload: data,
  })
}

export const removeForm = (formId) => ({
  type: FORM_TYPES.REMOVE_FORM,
  payload: formId,
})

export const updateForm = (formData) => ({
  type: FORM_TYPES.UPDATE_FORM,
  payload: formData,
})

export const cleanForms = () => ({
  type: FORM_TYPES.CLEAN_FORMS,
})
