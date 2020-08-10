import { AssignmentFormEffects } from '../effects/assignmentForm'

export class AssignmentFormActions {
  static SAVE_ASSIGNMENT = '[Assignment] SAVE_ASSIGNMENT'
  static SAVE_ASSIGNMENT_SUCCESS = '[Assignment] SAVE_ASSIGNMENT_SUCCESS'
  static SAVE_ASSIGNMENT_FAILURE = '[Assignment] SAVE_ASSIGNMENT_FAILURE'
  static SAVE_COURSE_ASSIGNMENT = '[Assignment] SAVE_COURSE_ASSIGNMENT'
  static SAVE_COURSE_ASSIGNMENT_SUCCESS =
    '[Assignment] SAVE_COURSE_ASSIGNMENT_SUCCESS'
  static SAVE_COURSE_ASSIGNMENT_FAILURE =
    '[Assignment] SAVE_COURSE_ASSIGNMENT_FAILURE'
  static UPLOAD_ATTACHMENT = '[Assignment] UPLOAD_ATTACHMENT'
  static UPLOAD_ATTACHMENT_SUCCESS = '[Assignment] UPLOAD_ATTACHMENT_SUCCESS'
  static UPLOAD_ATTACHMENT_FAILURE = '[Assignment] UPLOAD_ATTACHMENT_FAILURE'
  static REMOVE_ATTACHMENT = '[Assignment] REMOVE_ATTACHMENT'
  static RESET_ATTACHMENTS = '[Assignment] RESET_ATTACHMENTS'

  static saveAssignment = payload => ({
    type: AssignmentFormActions.SAVE_ASSIGNMENT,
    payload,
  })
  static saveAssignmentSuccess = payload => ({
    type: AssignmentFormActions.SAVE_ASSIGNMENT_SUCCESS,
    payload,
  })
  static saveAssignmentFailure = () => ({
    type: AssignmentFormActions.SAVE_ASSIGNMENT_FAILURE,
  })
  static saveCourseAssignment = payload => ({
    type: AssignmentFormActions.SAVE_COURSE_ASSIGNMENT,
    payload,
  })
  static saveCourseAssignmentSuccess = payload => ({
    type: AssignmentFormActions.SAVE_COURSE_ASSIGNMENT_SUCCESS,
    payload,
  })
  static saveCourseAssignmentFailure = () => ({
    type: AssignmentFormActions.SAVE_COURSE_ASSIGNMENT_FAILURE,
  })
  static uploadAttachment = (payload: {
    file: File
    name: string
    size: string
  }) => ({
    type: AssignmentFormActions.UPLOAD_ATTACHMENT,
    payload,
  })
  static uploadAttachmentSuccess = payload => ({
    type: AssignmentFormActions.UPLOAD_ATTACHMENT_SUCCESS,
    payload,
  })
  static uploadAttachmentFailure = payload => ({
    type: AssignmentFormActions.UPLOAD_ATTACHMENT_FAILURE,
    payload,
  })
  static removeAttachment = attachmentName => ({
    type: AssignmentFormActions.REMOVE_ATTACHMENT,
    payload: { attachmentName },
  })
  static resetAttachments = () => ({
    type: AssignmentFormActions.RESET_ATTACHMENTS,
  })
}
