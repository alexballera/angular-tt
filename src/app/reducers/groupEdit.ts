import { combineReducers } from '@ngrx/store'
import { subMinutes } from 'date-fns'
import { GroupEditActions } from '../actions'

function content(state = {}, { type, payload }) {
  switch (type) {
    case GroupEditActions.SET_CONTENT_DISTRIBUTION_GROUP:
      return { ...state, distributionGroup: payload }
    case GroupEditActions.SET_CONTENT_DATE:
      return {
        ...state,
        date: subMinutes(payload, payload.getTimezoneOffset()),
      }
    case GroupEditActions.SET_CONTENT_THEME:
      return { ...state, theme: payload }
    case GroupEditActions.SET_CONTENT_DURATION:
      return { ...state, duration: payload }
    case GroupEditActions.SET_CONTENT_RESOURCES:
      const eje = payload[0].tags.find(t => t.type === 'eje')
      return {
        ...state,
        resources: payload,
        theme: {
          _id: eje ? eje._id : payload[0]._id,
          title: eje ? eje.name : payload[0].title,
          default: true,
        },
      }
    case GroupEditActions.CONTENT_SHOW_MODAL:
      return { ...state, showModal: payload }
    case GroupEditActions.CONTENT_SELECT_THEME_SHOW_MODAL:
      return { ...state, showSelectThemeModal: payload }
    default:
      return state
  }
}

function theme(state = null, { type, payload }) {
  switch (type) {
    case GroupEditActions.SELECT_THEME:
      return payload
    default:
      return state
  }
}

function user(state = {}, { type, payload }) {
  switch (type) {
    case GroupEditActions.USER_SHOW_MODAL:
      return { ...state, showModal: payload }
    default:
      return state
  }
}

function assignContentLoading(state = false, { type }) {
  switch (type) {
    case GroupEditActions.SAVE_CONTENTS:
      return true
    case GroupEditActions.SAVE_CONTENTS_SUCCESS:
      return false
    case GroupEditActions.SAVE_CONTENTS_FAILURE:
      return false
    default:
      return state
  }
}

export const groupEdit = combineReducers({
  content,
  theme,
  user,
  assignContentLoading,
})
