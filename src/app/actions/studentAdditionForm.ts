export class StudentAdditionFormActions {
  static RESET_FORM = '[StudentAddtionFrom] RESET_FORM'

  static CHECK_USER = '[StudentAddtionFrom] CHECK_USER'
  static CHECK_USER_SUCCESS = '[StudentAddtionFrom] CHECK_USER_SUCCESS'
  static CHECK_USER_FAILURE = '[StudentAddtionFrom] CHECK_USER_FAILURE'

  static GET_USER = '[StudentAddtionFrom] GET_USER'
  static GET_USER_SUCCESS = '[StudentAddtionFrom] GET_USER_SUCCESS'
  static GET_USER_FAILURE = '[StudentAddtionFrom] GET_USER_FAILURE'

  static MARK_AS_REGISTERED_USER =
    '[StudentAddtionFrom] MARK_AS_REGISTERED_USER'
  static MARK_AS_EXISTING_USER = '[StudentAddtionFrom] MARK_AS_EXISTING_USER'
  static MARK_AS_NEW_USER = '[StudentAddtionFrom] MARK_AS_NEW_USER'

  static resetForm = () => ({
    type: StudentAdditionFormActions.RESET_FORM,
  })

  static getUser = payload => ({
    type: StudentAdditionFormActions.GET_USER,
    payload,
  })

  static getUserSuccess = () => ({
    type: StudentAdditionFormActions.GET_USER_SUCCESS,
  })

  static getUserFailure = payload => ({
    type: StudentAdditionFormActions.GET_USER_FAILURE,
    payload,
  })

  static checkUser = () => ({
    type: StudentAdditionFormActions.CHECK_USER,
  })

  static checkUserSuccess = () => ({
    type: StudentAdditionFormActions.CHECK_USER_SUCCESS,
  })

  static checkUserFailure = payload => ({
    type: StudentAdditionFormActions.CHECK_USER_FAILURE,
    payload,
  })

  static markAsRegisteredUser = () => ({
    type: StudentAdditionFormActions.MARK_AS_REGISTERED_USER,
  })

  static markAsExistingUser = payload => ({
    type: StudentAdditionFormActions.MARK_AS_EXISTING_USER,
    payload,
  })

  static markAsNewUser = () => ({
    type: StudentAdditionFormActions.MARK_AS_NEW_USER,
  })
}
