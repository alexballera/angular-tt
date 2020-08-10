import { Action } from '@ngrx/store'
import { Notification } from '../../models'

export const NotificationActionTypes = {
  DISPATCH: '[@ticmas/common-components Notification] DISPATCH',
  READ: '[@ticmas/common-components Notification] READ',
  HIDE_TOAST: '[@ticmas/common-components Notification] HIDE_TOAST',
}

export class DispatchNotification implements Action {
  readonly type = NotificationActionTypes.DISPATCH
  payload: Notification

  constructor({
    id = String(Date.now()),
    type = 'info',
    text = null,
    action = null,
    persistent = false,
    timestamp = Date.now(),
    payload = null,
  }: Partial<Notification>) {
    this.payload = { id, type, text, action, persistent, timestamp, payload }
  }
}

export class HideToast implements Action {
  readonly type = NotificationActionTypes.HIDE_TOAST

  constructor(public payload: Pick<Notification, 'id'>) {}
}

export class ReadNotifications implements Action {
  readonly type = NotificationActionTypes.READ

  constructor(public payload: number = Date.now()) {}
}
