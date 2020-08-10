import { combineReducers } from '@ngrx/store'
import {
  ContextActions,
  DistributionGroupActions,
  UiStatesActions,
} from '../actions'
import { LoadingActions } from '../actions/loading'

function loading(state = false, { type, payload }) {
  switch (type) {
    case ContextActions.FETCH:
    case DistributionGroupActions.FETCH:
      return true
    case ContextActions.FETCH_SUCCESS:
    case ContextActions.FETCH_FAILURE:
    case DistributionGroupActions.FETCH_FAILURE:
    case DistributionGroupActions.FETCH_SUCCESS:
      return false
    case LoadingActions.LOADING_SITE:
      return payload
    default:
      return state
  }
}

function loadingSmall(state = false, { type, payload }) {
  switch (type) {
    case UiStatesActions.LOADING_SMALL:
      return !state
    default:
      return state
  }
}

function showNotifications(state = false, { type }) {
  switch (type) {
    case UiStatesActions.TOGGLE_NOTIFICATIONS:
      return !state
    default:
      return state
  }
}

function showProfile(state = false, { type, payload }) {
  switch (type) {
    case UiStatesActions.TOGGLE_SHOW_PROFILE:
      return !state
    default:
      return state
  }
}

function showComments(state = false, { type, payload }) {
  switch (type) {
    case UiStatesActions.SHOW_COMMENTS:
      return !state
    default:
      return state
  }
}

function showLibrary(state = false, { type, payload }) {
  switch (type) {
    case UiStatesActions.SHOW_LIBRARY:
      return payload
    default:
      return state
  }
}

function showAddContentCustom(state = false, { type, payload }) {
  switch (type) {
    case UiStatesActions.SHOW_ADD_CONTENT_CUSTOM:
      return payload
    default:
      return state
  }
}

function showModalResetPassword(state = false, { type, payload }) {
  switch (type) {
    case UiStatesActions.SHOW_MODAL_RESET_PASSWORD:
      return payload
    default:
      return state
  }
}
export const uiStates = combineReducers({
  loading,
  showLibrary,
  showNotifications,
  showProfile,
  loadingSmall,
  showComments,
  showAddContentCustom,
  showModalResetPassword,
})
