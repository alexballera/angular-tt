import { AttendedActions } from '../actions'
import { format } from 'date-fns'

export function attended(state = [], { type, payload }) {
  switch (type) {
    case AttendedActions.SAVE_ATTENDED_SUCCESS:
      return state.concat([
        {
          distributionGroup_id: payload.distributionGroup_id,
          date: payload.date,
          users: payload.users,
        },
      ])

    case AttendedActions.GET_ATTENDED_SUCCESS:
      return payload

    default:
      return state
  }
}
