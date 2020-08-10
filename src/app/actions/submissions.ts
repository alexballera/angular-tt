export class SubmissionsActions {
  static UPDATE_STUDENT_SUBMISSION_STATUS =
    '[Submission] UPDATE_STUDENT_SUBMISSION_STATUS'
  static UPDATE_STUDENT_SUBMISSION_STATUS_SUCCESS =
    '[Submission] UPDATE_STUDENT_SUBMISSION_STATUS_SUCCESS'
  static UPDATE_STUDENT_SUBMISSION_STATUS_FAILURE =
    '[Submission] UPDATE_STUDENT_SUBMISSION_STATUS_FAILURE'
  static ADD_COMMENT = '[Submission] ADD_COMMENT'
  static ADD_COMMENT_SUCCESS = '[Submission] ADD_COMMENT_SUCCESS'
  static ADD_COMMENT_FAILURE = '[Submission] ADD_COMMENT_FAILURE'
  static updateStudentSubmissionStatus = payload => ({
    type: SubmissionsActions.UPDATE_STUDENT_SUBMISSION_STATUS,
    payload, // effect
  })
  static updateStudentSubmissionStatusSuccess = payload => ({
    type: SubmissionsActions.UPDATE_STUDENT_SUBMISSION_STATUS_SUCCESS,
    payload, // reducer
  })
  static updateStudentSubmissionStatusFailure = () => ({
    type: SubmissionsActions.UPDATE_STUDENT_SUBMISSION_STATUS_FAILURE,
  })
  static addComment = payload => ({
    type: SubmissionsActions.ADD_COMMENT,
    payload,
  })
  static addCommentSuccess = payload => ({
    type: SubmissionsActions.ADD_COMMENT_SUCCESS,
    payload,
  })
  static addCommentFailure = () => ({
    type: SubmissionsActions.ADD_COMMENT_FAILURE,
  })
}
