import { ActionReducerMap } from '@ngrx/store'
import { Notification } from '../../models'
import {
  DispatchNotification,
  HideToast,
  NotificationActionTypes,
  ReadNotifications,
} from './actions'

export function lastRead(state = 0, { type, payload }: ReadNotifications) {
  switch (type) {
    case NotificationActionTypes.READ:
      return payload
    default:
      return state
  }
}

export function list(state = [], { type, payload }: DispatchNotification) {
  switch (type) {
    case NotificationActionTypes.DISPATCH:
      return state.concat([payload])
    default:
      return state
  }
}

export function toastsShown(state = [], { type, payload }: HideToast) {
  switch (type) {
    case NotificationActionTypes.HIDE_TOAST:
      return state.concat([payload])
    default:
      return state
  }
}

export interface State {
  lastRead: number
  list: Notification[]
  toastsShown: Array<Pick<Notification, 'id'>>
}

export const reducers: ActionReducerMap<State> = {
  lastRead,
  list,
  toastsShown,
}
