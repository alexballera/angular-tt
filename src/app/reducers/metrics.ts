import { combineReducers } from '@ngrx/store'
import { WeeklyInteraction } from '@ticmas/common-interfaces'
import { MetricsActions } from '../actions'

function coursesMetrcis(state = {}, { type, payload }) {
  switch (type) {
    case MetricsActions.GET_COURSES_METRICS_SUCCESS:
      return payload
    default:
      return state
  }
}

function coursesFromLastWeek(state = {}, { type, payload }) {
  switch (type) {
    case MetricsActions.GET_COURSES_METRICS_FROM_LAST_WEEK_SUCCESS:
      return payload
    default:
      return state
  }
}

function selectedGroupMetrics(state = [], { type, payload }) {
  switch (type) {
    case MetricsActions.GET_SELECTED_GROUP_METRICS_SUCCESS:
      let st = state
      const found = st.find(({ course }) => course === payload.course)
      if (!found) {
        st = st.concat([payload])
      }
      return st
    default:
      return state
  }
}

function selected(state = {}, { type, payload }) {
  switch (type) {
    case MetricsActions.GET_SELECTED_GROUP_METRICS_SUCCESS:
      return payload
    default:
      return state
  }
}

function groups(state = {}, { type, payload }) {
  switch (type) {
    case MetricsActions.GET_GROUPS_METRICS_SUCCESS:
      return { ...state, ...payload }
    default:
      return state
  }
}

function selectedStudent(state = null, { type, payload }) {
  switch (type) {
    case MetricsActions.GET_STUDENT_METRICS_SUCCESS:
      return payload
    default:
      return state
  }
}

function weeklyInteractions(state = [], { type, payload }) {
  switch (type) {
    case MetricsActions.GET_STUDENT_WEEKLY_METRICS_SUCCESS:
      let st = state
      const found = st.find(({ actor }) => actor === payload.actor)
      if (!found) {
        st = st.concat([payload])
      }
      return st
    default:
      return state
  }
}

const courses = combineReducers({
  general: coursesMetrcis,
  fromLastWeek: coursesFromLastWeek,
  requested: selectedGroupMetrics,
})

const students = combineReducers({
  selected: selectedStudent,
  weeklyInteractions,
})

export const metrics = combineReducers({
  courses,
  groups,
  selected,
  students,
})
