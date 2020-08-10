export class AttendedActions {
  static SAVE_ATTENDED = '[Attended] SAVE_ATTENDED'
  static UPDATE_ATTENDED = '[Attended] UPDATE_ATTENDED'
  static SAVE_ATTENDED_SUCCESS = '[Attended] SAVE_ATTENDED_SUCCESS'
  static SAVE_ATTENDED_FAILURE = '[Attended] SAVE_ATTENDED_FAILURE'

  static GET_ATTENDED = '[Attended] GET_ATTENDED'
  static GET_ATTENDED_SUCCESS = '[Attended] GET_ATTENDED_SUCCESS'

  static saveAttended = payload => ({
    type: AttendedActions.SAVE_ATTENDED,
    payload,
  })
  static updateAttended = payload => ({
    type: AttendedActions.UPDATE_ATTENDED,
    payload,
  })
  static saveAttendedSuccess = payload => ({
    type: AttendedActions.SAVE_ATTENDED_SUCCESS,
    payload,
  })
  static saveAttendedFailure = payload => ({
    type: AttendedActions.SAVE_ATTENDED_FAILURE,
    payload,
  })
  static getAttended = payload => ({
    type: AttendedActions.GET_ATTENDED,
    payload,
  })
  static getAttendedSuccess = payload => ({
    type: AttendedActions.GET_ATTENDED_SUCCESS,
    payload,
  })
}
