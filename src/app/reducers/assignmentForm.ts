import { combineReducers } from '@ngrx/store'
import { AssignmentFormActions } from '../actions'

function attachments(state = [], { type, payload }) {
  switch (type) {
    case AssignmentFormActions.UPLOAD_ATTACHMENT_SUCCESS:
      return state.concat(payload)
    case AssignmentFormActions.REMOVE_ATTACHMENT:
      return state.filter(
        attachment => attachment.name !== payload.attachmentName
      )
    case AssignmentFormActions.RESET_ATTACHMENTS:
      return []
    default:
      return state
  }
}

function attachmentLoading(state = false, { type }) {
  switch (type) {
    case AssignmentFormActions.UPLOAD_ATTACHMENT:
      return true
    case AssignmentFormActions.UPLOAD_ATTACHMENT_SUCCESS:
      return false
    case AssignmentFormActions.UPLOAD_ATTACHMENT_FAILURE:
      return false
    default:
      return state
  }
}

export const assignmentForm = combineReducers({
  attachments,
  attachmentLoading,
})
