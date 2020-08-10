import { combineReducers } from '@ngrx/store'
import { ClassroomIntegrationActions } from './../actions'

function classroomLoading(state = false, { type }) {
  switch (type) {
    case ClassroomIntegrationActions.SYNC_CLASSROOM_COURSES:
      return true
    case ClassroomIntegrationActions.SYNC_CLASSROOM_COURSES_SUCCESS:
      return false
    case ClassroomIntegrationActions.SYNC_CLASSROOM_COURSES_FAILURE:
      return false
    default:
      return state
  }
}

export const integrations = combineReducers({
  classroomLoading,
})
