import { UsersActions } from '../actions'

export function userEomt(state = {}, { type, payload }) {
  switch (type) {
    case UsersActions.GET_USER_EOMT_SUCCESS:
      return payload
    case UsersActions.PREVIEW_UPLOAD_SUCCESS:
      return payload
    default:
      return state
  }
}
