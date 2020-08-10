export class UiStatesActions {
  static TOGGLE_SHOW_PROFILE = '[UI States] TOGGLE_SHOW_PROFILE'
  static TOGGLE_NOTIFICATIONS = '[UI States] TOGGLE_NOTIFICATIONS'
  static SHOW_LIBRARY = '[UI States] SHOW_LIBRARY'
  static SHOW_ADD_CONTENT_CUSTOM = '[UI States] SHOW_ADD_CONTENT_CUSTOM'
  static LOADING_SMALL = '[UI States] LOADING_SMALL'
  static SHOW_COMMENTS = '[UI States] SHOW_COMMENTS'
  static SHOW_MODAL_RESET_PASSWORD = '[UI States] SHOW_MODAL_RESET_PASSWORD'

  static toggleShowProfile = () => ({
    type: UiStatesActions.TOGGLE_SHOW_PROFILE,
  })
  static toggleNotifications = () => ({
    type: UiStatesActions.TOGGLE_NOTIFICATIONS,
  })
  static showLibrary = payload => ({
    type: UiStatesActions.SHOW_LIBRARY,
    payload,
  })
  static showAddContentCustom = payload => ({
    type: UiStatesActions.SHOW_ADD_CONTENT_CUSTOM,
    payload,
  })
  static loadingSmall = payload => ({
    type: UiStatesActions.LOADING_SMALL,
    payload,
  })
  static showComments = () => ({ type: UiStatesActions.SHOW_COMMENTS })
  static showModalResetPassword = payload => ({
    type: UiStatesActions.SHOW_MODAL_RESET_PASSWORD,
    payload,
  })
}
