import { combineReducers } from '@ngrx/store'
import set from 'lodash/fp/set'
import sortBy from 'lodash/fp/sortBy'
import { DistributionGroupActions } from '../actions/distributionGroup'
import { AssignmentActions } from './../actions'
import { SubmissionsActions } from './../actions/submissions'

function courseAssignments(state = [], { type, payload }) {
  switch (type) {
    case AssignmentActions.GET_ASSIGNMENTS_SUCCESS:
      return payload
    default:
      return state
  }
}

function studentAssignments(state = [], { type, payload }) {
  let submissionId
  let studentAssignmentId
  switch (type) {
    case AssignmentActions.GET_STUDENT_ASSIGNMENTS_SUCCESS:
      return payload.map(studentAssignment => ({
        ...studentAssignment,
        submissions: sortBy('createdAt', studentAssignment.submissions),
      }))
    case DistributionGroupActions.SELECT:
      return []
    case SubmissionsActions.UPDATE_STUDENT_SUBMISSION_STATUS_SUCCESS:
      studentAssignmentId = payload.studentAssignmentId
      submissionId = payload.submissionId
      const newState = state.map(studentAssignment => {
        if (studentAssignment.id === studentAssignmentId) {
          return {
            ...studentAssignment,
            submissions: studentAssignment.submissions.map(submission => {
              if (submission.id === submissionId) {
                return {
                  ...submission,
                  state: {
                    ...submission.state,
                    description: payload.state,
                  },
                  grade: payload.grade,
                }
              } else {
                return submission
              }
            }),
          }
        } else {
          return studentAssignment
        }
      })
      return newState
    case SubmissionsActions.ADD_COMMENT_SUCCESS:
      submissionId = payload.submission.id
      studentAssignmentId = payload.studentAssignmentId

      return state.map(studentAssignment => {
        if (studentAssignment.id === studentAssignmentId) {
          return {
            ...studentAssignment,
            submissions: studentAssignment.submissions.map(submission => {
              if (submission.id === submissionId) {
                return {
                  ...submission,
                  comments: submission.comments.concat({
                    id: payload.id,
                    text: payload.text,
                    createdAt: payload.createdAt,
                    authorId: payload.authorId,
                  }),
                }
              } else {
                return submission
              }
            }),
          }
        } else {
          return studentAssignment
        }
      })

    default:
      return state
  }
}

function selectedStudentAssignmentId(state = null, { type, payload }) {
  switch (type) {
    case AssignmentActions.SAVE_STUDENT_ASSIGNMENT_ID:
      return payload
    default:
      return state
  }
}

export const assignments = combineReducers({
  courseAssignments,
  studentAssignments,
  selectedStudentAssignmentId,
})
