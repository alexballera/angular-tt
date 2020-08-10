import { UsersActions } from '../actions'

export function saveUsers(state = {}, { type, payload }) {
  switch (type) {
    case UsersActions.SAVE_SUCCESS:
      return payload

    case UsersActions.SAVE_FAILURE:
      return state

    default:
      return state
  }
}

export function recentUserResetData(state, { type, payload }) {
  switch (type) {
    case UsersActions.RESET_PASSWORD_SUCCESS:
      return payload

    default:
      return state
  }
}

export function userResetData(state, { type, payload }) {
  switch (type) {
    case UsersActions.USER_RESET_PASSWORD:
      return payload

    default:
      return state
  }
}
