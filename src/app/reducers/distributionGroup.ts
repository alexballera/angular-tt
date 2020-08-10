import { combineReducers } from '@ngrx/store'
import { DistributionGroup } from '@ticmas/common-interfaces'
import get from 'lodash/fp/get'
import {
  CurriculaActions,
  DistributionGroupActions,
  GroupEditActions,
  PlanningActions,
  UsersActions,
} from '../actions'
import { NgrxMetareducers } from '../ngrx-helpers'

function lastFetched(state: Date = null, action) {
  switch (action.type) {
    case DistributionGroupActions.FETCH:
      return action[NgrxMetareducers.TIMESTAMP]
    default:
      return state
  }
}

function selection(state = null, { type, payload }) {
  switch (type) {
    case DistributionGroupActions.SELECT:
      return payload
    case DistributionGroupActions.FETCH_SUCCESS:
      return state || get([0, '_id'], payload)
    case DistributionGroupActions.DELETE_DISTRIBUTION_GROUP_SUCCESS:
      return state === payload ? null : state
    default:
      return state
  }
}

function subgroupSelected(state = null, { type, payload }) {
  switch (type) {
    case DistributionGroupActions.SELECT_SUBGROUP:
      return payload
    default:
      return state
  }
}

function list(state: DistributionGroup[] = [], { type, payload }) {
  switch (type) {
    case DistributionGroupActions.FETCH_SUCCESS:
      return payload
    case DistributionGroupActions.CREATE_SUCCESS:
      return state.concat([payload])
    case GroupEditActions.SAVE_CONTENTS_SUCCESS:
    case PlanningActions.IMPORT_SUCCESS:
      return state.map(group => (group._id === payload._id ? payload : group))
    case GroupEditActions.DELETE_CONTENT_SUCCESS:
      return state.map(group =>
        group._id === payload.group._id
          ? {
              ...group,
              contents: group.contents.filter(
                c => c._id !== payload.content._id
              ),
            }
          : group
      )
    case UsersActions.SAVE_SUCCESS:
      return state.map(group =>
        group._id === payload.groupId
          ? {
              ...group,
              users: group.users.concat(payload.user),
            }
          : group
      )
    case UsersActions.DELETE_SUCCESS:
      return state.map(group =>
        group._id === payload.groupId
          ? {
              ...group,
              users: group.users.filter(
                c => c.preferred_username !== payload.userId
              ),
            }
          : group
      )
    case GroupEditActions.DELETE_THEME_SUCCESS:
      return state.map(group =>
        group._id === payload.group._id
          ? {
              ...group,
              themes: group.themes.filter(c => c._id !== payload.theme._id),
            }
          : group
      )
    case DistributionGroupActions.EMPTY_THEMES_DISTRIBUTION_GROUP:
      return state.map(group =>
        group._id === payload
          ? {
              ...group,
              themes: [],
            }
          : group
      )
    case DistributionGroupActions.EMPTY_CONTENTS_DISTRIBUTION_GROUP:
      return state.map(group =>
        group._id === payload
          ? {
              ...group,
              contents: [],
            }
          : group
      )
    case GroupEditActions.ADD_THEME_SUCCESS:
      return state.map(group =>
        group._id === payload.group._id
          ? {
              ...group,
              themes: group.themes.concat(payload.theme),
            }
          : group
      )
    case GroupEditActions.UPDATE_THEME_SUCCESS:
      return state.map(group =>
        group._id === payload.group._id
          ? {
              ...group,
              themes: group.themes.map(theme =>
                theme._id === payload.theme._id ? payload.theme : theme
              ),
            }
          : group
      )
    case GroupEditActions.UPDATE_CONTENT_SUCCESS:
      return state.map(group =>
        group._id === payload.group
          ? {
              ...group,
              contents: group.contents.map(content =>
                content._id === payload.data._id ? payload.data : content
              ),
            }
          : group
      )
    case DistributionGroupActions.DELETE_DISTRIBUTION_GROUP:
      return state.filter(group => group._id !== payload)
    case CurriculaActions.SET_THEMES_SUCCESS:
      return state.map(group =>
        group._id === payload.group
          ? {
              ...group,
              themes: payload.themes,
            }
          : group
      )
    case DistributionGroupActions.ADD_USERS_SUBGROUP_SUCCESS:
      return state.map(group =>
        group._id === payload.groupId
          ? {
              ...group,
              users: payload.users,
            }
          : group
      )
    case DistributionGroupActions.DELETE_DISTRIBUTION_GROUP_BY_COURSE_SUCCESS:
      return state.filter(group => group.course !== payload)
    default:
      return state
  }
}

function importCurricula(state = null, { type, payload }) {
  switch (type) {
    case CurriculaActions.IMPORT_CURRICULA:
      return payload
    case CurriculaActions.FAILURE_CURRICULA:
      return 'fail'
    default:
      return state
  }
}

function showErrorCurricula(state = false, { type, payload }) {
  switch (type) {
    case CurriculaActions.SHOW_ERROR_CURRICULA:
      return payload
    default:
      return state
  }
}

function usersForm(state = [], { type, payload }) {
  switch (type) {
    case DistributionGroupActions.ADD_USER_FORM:
      let flag = false
      state.map(u => {
        if (u.sub === payload.sub) {
          flag = true
        }
      })
      if (!flag) {
        return state.concat(payload)
      } else {
        return state
      }
    case DistributionGroupActions.REMOVE_USER_FORM:
      return state.filter(usr => usr.sub !== payload.sub)
    case DistributionGroupActions.CREATE_SUCCESS:
    case DistributionGroupActions.REMOVE_USERS_FORM:
      return []
    default:
      return state
  }
}

function attachContent(state = [], { type, payload }) {
  switch (type) {
    case DistributionGroupActions.ADD_ATTACH_CONTENT_SUCCESS:
      return state.concat(payload)
    case DistributionGroupActions.REMOVE_ATTACH_CONTENT:
      return state.filter(st => st.url !== payload)
    case DistributionGroupActions.RESET_ATTACH_CONTENT:
      return []
    default:
      return state
  }
}

function attachFilesContent(
  state = { file: '', cover: '' },
  { type, payload }
) {
  switch (type) {
    case DistributionGroupActions.UPLOAD_COVER_ATTACH_CONTENT_SUCCESS:
      return { ...state, cover: payload }
    case DistributionGroupActions.UPLOAD_FILE_ATTACH_CONTENT_SUCCESS:
      return { ...state, file: payload }
    case DistributionGroupActions.RESET_FILE_ATTACH_CONTENT:
      return { file: '', cover: '' }
    default:
      return state
  }
}

function attachCoverLoading(state = false, { type }) {
  switch (type) {
    case DistributionGroupActions.UPLOAD_COVER_ATTACH_CONTENT:
      return true
    case DistributionGroupActions.UPLOAD_COVER_ATTACH_CONTENT_SUCCESS:
      return false
    default:
      return state
  }
}

export const distributionGroup = combineReducers({
  lastFetched,
  list,
  selection,
  subgroupSelected,
  importCurricula,
  showErrorCurricula,
  usersForm,
  attachContent,
  attachFilesContent,
  attachCoverLoading,
})
