import { NotificationsActions } from '../actions'
import uniqBy from 'lodash/uniqBy'

export function notifications(
  state = { info: [], revised: true },
  { type, payload }
) {
  switch (type) {
    case NotificationsActions.NOTIFICATIONS_REVISED_SUCCESS:
    case NotificationsActions.NOTIFICATIONS_REVISED_FAILURE:
      const revised = state
      revised.info.map(noti => {
        if (!noti.notifiedUsers.includes(payload)) {
          noti.notifiedUsers.push(payload)
        }
      })
      return revised
    case NotificationsActions.GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        info: uniqBy([...state.info.reverse(), ...payload], JSON.stringify),
      }
    default:
      return state
  }
}
