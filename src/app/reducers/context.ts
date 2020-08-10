import { combineReducers } from '@ngrx/store'
import { ContextActions } from '../actions'
import { NgrxMetareducers } from '../ngrx-helpers'

function lastFetched(state: Date = null, action) {
  switch (action.type) {
    case ContextActions.FETCH:
      return action[NgrxMetareducers.TIMESTAMP]
    default:
      return state
  }
}

function list(state = [], { type, payload }) {
  switch (type) {
    case ContextActions.FETCH_SUCCESS:
      return payload
    case ContextActions.CREATE_SUCCESS:
      return state.concat([payload])
    case ContextActions.DELETE_SUCCESS:
      return state.filter(c => c._id !== payload)
    case ContextActions.UPDATE_SUCCESS:
      return state.filter(c => c._id !== payload._id).concat(payload)
    default:
      return state
  }
}

function school(state = null, { type, payload }) {
  switch (type) {
    case ContextActions.FETCH_SUCCESS:
      return payload.filter(g => g.type === 'Escuela')[0]
    case ContextActions.SET_SCHOOL:
      return payload
    default:
      return state
  }
}

function schools(state = [], { type, payload }) {
  switch (type) {
    case ContextActions.FETCH_SUCCESS:
      return payload.filter(g => g.type === 'Escuela')
    default:
      return state
  }
}

function selection(state = [], { type, payload }) {
  switch (type) {
    case ContextActions.SELECT:
      return state.slice(0, payload.index).concat([payload.context])
    case ContextActions.CLEAR_SELECTION:
      return []
    case ContextActions.CREATE_SUCCESS:
      return state.concat([payload])
    default:
      return state
  }
}

function tmpContext(state = null, { type, payload }) {
  switch (type) {
    case ContextActions.CREATE_SUCCESS:
      return payload._id
    case ContextActions.DELETE_SUCCESS:
      return null
    default:
      return state
  }
}

function showDetail(state = null, { type, payload }) {
  switch (type) {
    case ContextActions.TOGGLE_DETAIL:
      return state === payload ? null : payload
    default:
      return state
  }
}

export const context = combineReducers({
  lastFetched,
  list,
  selection,
  showDetail,
  tmpContext,
  school,
  schools,
})
