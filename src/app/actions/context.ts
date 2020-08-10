export class ContextActions {
  static FETCH = '[Context] FETCH'
  static FETCH_SUCCESS = '[Context] FETCH_SUCCESS'
  static FETCH_FAILURE = '[Context] FETCH_FAILURE'
  static SELECT = '[Context] SELECT'
  static CLEAR_SELECTION = '[Context] CLEAR_SELECTION'
  static TOGGLE_DETAIL = '[Context] TOGGLE_DETAIL'
  static CREATE = '[Context] CREATE'
  static CREATE_SUCCESS = '[Context] CREATE_SUCCESS'
  static CREATE_FAILURE = '[Context] CREATE_FAILURE'
  static DELETE = '[Context] DELETE'
  static DELETE_SUCCESS = '[Context] DELETE_SUCCESS'
  static CANCEL_CREATE = '[Context] CANCEL_CREATE'
  static UPDATE = '[Context] UPDATE'
  static UPDATE_SUCCESS = '[Context] UPDATE_SUCCESS'
  static SET_SCHOOL = '[Context] SET_SCHOOL'
  static fetch = (payload: Date = new Date()) => ({
    type: ContextActions.FETCH,
    payload,
  })
  static fetchSuccess = payload => ({
    type: ContextActions.FETCH_SUCCESS,
    payload,
  })
  static fetchFailure = payload => ({
    type: ContextActions.FETCH_FAILURE,
    payload,
  })
  static select = payload => ({ type: ContextActions.SELECT, payload })
  static clearSelection = () => ({ type: ContextActions.CLEAR_SELECTION })
  static toggleDetail = payload => ({
    type: ContextActions.TOGGLE_DETAIL,
    payload,
  })
  static create = payload => ({ type: ContextActions.CREATE, payload })
  static createSuccess = payload => ({
    type: ContextActions.CREATE_SUCCESS,
    payload,
  })
  static createFailure = payload => ({
    type: ContextActions.CREATE_FAILURE,
    payload,
  })
  static delete = payload => ({ type: ContextActions.DELETE, payload })
  static cancelCreate = () => ({ type: ContextActions.CANCEL_CREATE })
  static deleteSuccess = payload => ({
    type: ContextActions.DELETE_SUCCESS,
    payload,
  })
  static update = payload => ({
    type: ContextActions.UPDATE,
    payload,
  })
  static updateSuccess = payload => ({
    type: ContextActions.UPDATE_SUCCESS,
    payload,
  })
  static setSchool = payload => ({
    type: ContextActions.SET_SCHOOL,
    payload,
  })
}
