export class UsersActions {
  static SAVE = '[user] SAVE'
  static SAVE_SUCCESS = '[user] SAVE_SUCCESS'
  static SAVE_FAILURE = '[user] SAVE_FAILURE'

  static UPDATE = '[user] UPDATE'

  static DELETE = '[user] DELETE'
  static DELETE_SUCCESS = '[user] DELETE_SUCCESS'
  static DELETE_FAILURE = '[user] DELETE_FAILURE'

  static USER_RESET_PASSWORD = '[user] USER_RESET_PASSWORD'
  static RESET_PASSWORD = '[user] RESET_PASSWORD'
  static RESET_PASSWORD_SUCCESS = '[user] RESET_PASSWORD_SUCCESS'
  static RESET_PASSWORD_FAILURE = '[user] RESET_PASSWORD_FAILURE'

  static SAVE_USER_CDMS = '[user] SAVE_USER_CDMS'
  static DELETE_USER_CDMS = '[user] DELETE_USER_CDMS'

  static SAVE_USER_EOMT = '[user] SAVE_USER_EOMT'
  static SAVE_USER_EOMT_GROUP = '[user] SAVE_USER_EOMT_GROUP'
  static DELETE_USER_EOMT = '[user] DELETE_USER_EOMT'

  static GET_USER_EOMT = '[user] GET_USER_EOMT'
  static GET_USER_EOMT_SUCCESS = '[user] GET_USER_EOMT_SUCCESS'
  static GET_USER_EOMT_FAILURE = '[user] GET_USER_EOMT_FAILURE'

  static UPDATE_PROFILE = '[user] UPDATE_PROFILE'
  static UPDATE_PROFILE_SUCCESS = '[user] UPDATE_PROFILE_SUCCESS'
  static UPDATE_PROFILE_FAILURE = '[user] UPDATE_PROFILE_FAILURE'

  static PREVIEW_UPLOAD = '[Resource form] PREVIEW_UPLOAD'
  static PREVIEW_UPLOAD_SUCCESS = '[Resource form] PREVIEW_UPLOAD_SUCCESS'
  static PREVIEW_UPLOAD_FAILURE = '[Resource form] PREVIEW_UPLOAD_FAILURE'

  static save = () => ({ type: UsersActions.SAVE })

  static saveSuccess = payload => ({
    type: UsersActions.SAVE_SUCCESS,
    payload,
  })

  static saveFailure = payload => ({
    type: UsersActions.SAVE_FAILURE,
    payload,
  })

  static userResetPassword = payload => ({
    type: UsersActions.USER_RESET_PASSWORD,
    payload,
  })

  static resetPassword = payload => ({
    type: UsersActions.RESET_PASSWORD,
    payload,
  })

  static resetPasswordSuccess = payload => ({
    type: UsersActions.RESET_PASSWORD_SUCCESS,
    payload,
  })

  static resetPasswordFailure = payload => ({
    type: UsersActions.RESET_PASSWORD_FAILURE,
    payload,
  })

  static saveUserEomt = payload => ({
    type: UsersActions.SAVE_USER_EOMT,
    payload,
  })

  static saveUserEomtGroup = payload => ({
    type: UsersActions.SAVE_USER_EOMT_GROUP,
    payload,
  })

  static saveUserCdms = (payload?) => ({
    type: UsersActions.SAVE_USER_CDMS,
    payload,
  })

  static updateUser = payload => ({ type: UsersActions.UPDATE, payload })

  static deleteUserCdms = payload => ({
    type: UsersActions.DELETE_USER_CDMS,
    payload,
  })

  static deleteUserEomt = payload => ({
    type: UsersActions.DELETE_USER_EOMT,
    payload,
  })

  static delete = payload => ({
    type: UsersActions.DELETE,
    payload,
  })

  static deleteSuccess = payload => ({
    type: UsersActions.DELETE_SUCCESS,
    payload,
  })

  static deleteFailure = payload => ({
    type: UsersActions.DELETE_FAILURE,
    payload,
  })

  static getUserEomt = payload => ({
    type: UsersActions.GET_USER_EOMT,
    payload,
  })

  static getUserEomtSuccess = payload => ({
    type: UsersActions.GET_USER_EOMT_SUCCESS,
    payload,
  })

  static getUserEomtFailure = payload => ({
    type: UsersActions.GET_USER_EOMT_FAILURE,
    payload,
  })

  static updateProfile = payload => ({
    type: UsersActions.UPDATE_PROFILE,
    payload,
  })
  static updateProfileSuccess = payload => ({
    type: UsersActions.UPDATE_PROFILE_SUCCESS,
    payload,
  })
  static updateProfileFailure = payload => ({
    type: UsersActions.UPDATE_PROFILE_FAILURE,
    payload,
  })

  static previewUpload = payload => ({
    type: UsersActions.PREVIEW_UPLOAD,
    payload,
  })

  static previewUploadSuccess = (payload: any) => ({
    type: UsersActions.PREVIEW_UPLOAD_SUCCESS,
    payload,
  })

  static previewUploadFailure = (payload: any) => ({
    type: UsersActions.PREVIEW_UPLOAD_FAILURE,
    payload,
  })
}
