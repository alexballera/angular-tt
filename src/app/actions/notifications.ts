export class NotificationsActions {
  static GET_NOTIFICATIONS = '[notifications] GET_NOTIFICATIONS'
  static GET_NOTIFICATIONS_SUCCESS = '[notifications] GET_NOTIFICATIONS_SUCCESS'
  static NOTIFICATIONS_REVISED = '[notifications] NOTIFICATIONS_REVISED'
  static NOTIFICATIONS_REVISED_SUCCESS =
    '[notifications] NOTIFICATIONS_REVISED_SUCCESS'
  static NOTIFICATIONS_REVISED_FAILURE =
    '[notifications] NOTIFICATIONS_REVISED_FAILURE'

  static getNotifications = payload => ({
    type: NotificationsActions.GET_NOTIFICATIONS,
    payload,
  })

  static getNotificationsSuccess = (payload: any) => ({
    type: NotificationsActions.GET_NOTIFICATIONS_SUCCESS,
    payload,
  })

  static notificationsRevised = payload => ({
    type: NotificationsActions.NOTIFICATIONS_REVISED,
    payload,
  })

  static notificationsRevisedSuccess = payload => ({
    type: NotificationsActions.NOTIFICATIONS_REVISED_SUCCESS,
    payload,
  })

  static notificationsRevisedFailure = payload => ({
    type: NotificationsActions.NOTIFICATIONS_REVISED_FAILURE,
    payload,
  })
}
