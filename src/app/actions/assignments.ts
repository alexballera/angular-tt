export class AssignmentActions {
  static GET_ASSIGNMENTS = '[Assignment] GET_ASSIGNMENTS'
  static GET_ASSIGNMENTS_SUCCESS = '[Assignment] GET_ASSIGNMENTS_SUCCESS'
  static GET_ASSIGNMENTS_FAILURE = '[Assignment] GET_ASSIGNMENTS_FAILURE'

  static GET_STUDENT_ASSIGNMENTS = '[Assignment] GET_STUDENT_ASSIGNMENTS'
  static GET_STUDENT_ASSIGNMENTS_SUCCESS =
    '[Assignment] GET_STUDENT_ASSIGNMENTS_SUCCESS'
  static GET_STUDENT_ASSIGNMENTS_FAILURE =
    '[Assignment] GET_STUDENT_ASSIGNMENTS_FAILURE'
  static SAVE_STUDENT_ASSIGNMENT_ID = '[Assignment] SAVE_STUDENT_ASSIGNMENT_ID'

  static GET_SUBMISSIONS = '[Assignment] GET_SUBMISSIONS'
  static GET_SUBMISSIONS_SUCCESS = '[Assignment] GET_SUBMISSIONS_SUCCESS'
  static GET_SUBMISSIONS_FAILURE = '[Assignment] GET_SUBMISSIONS_FAILURE'
  static SELECT_STUDENT_ASSIGNMENT = '[Assignment] SELECT_STUDENT_ASSIGNMENT'

  static selectStudentAssignment = payload => ({
    type: AssignmentActions.SELECT_STUDENT_ASSIGNMENT,
    payload,
  })
  static getAssignments = () => ({
    type: AssignmentActions.GET_ASSIGNMENTS,
  })
  static getAssignmentsSuccess = payload => ({
    type: AssignmentActions.GET_ASSIGNMENTS_SUCCESS,
    payload,
  })
  static getAssignmentsFailure = () => ({
    type: AssignmentActions.GET_ASSIGNMENTS_FAILURE,
  })

  static getStudentAssignments = payload => ({
    type: AssignmentActions.GET_STUDENT_ASSIGNMENTS,
    payload,
  })
  static getStudentAssignmentsSuccess = payload => ({
    type: AssignmentActions.GET_STUDENT_ASSIGNMENTS_SUCCESS,
    payload,
  })
  static getStudentAssignmentsFailure = () => ({
    type: AssignmentActions.GET_STUDENT_ASSIGNMENTS_FAILURE,
  })

  static getAssignmentSubmissions = () => ({
    type: AssignmentActions.GET_SUBMISSIONS,
  })
  static getAssignmentSubmissionsSuccess = payload => ({
    type: AssignmentActions.GET_SUBMISSIONS_SUCCESS,
    payload,
  })
  static getAssignmentSubmissionsFailure = () => ({
    type: AssignmentActions.GET_SUBMISSIONS_FAILURE,
  })
  static saveStudentAssignmentId = payload => ({
    type: AssignmentActions.SAVE_STUDENT_ASSIGNMENT_ID,
    payload,
  })
}
