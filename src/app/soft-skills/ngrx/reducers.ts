import { Action, combineReducers, createReducer, on } from '@ngrx/store'
import { Resource } from '@ticmas/common-interfaces'
import get from 'lodash/fp/get'
import { fetchData, selectSkill, selectSkillView } from './actions'

export interface State {
  generalGuideUrl: string
  list: Resource[]
  selected: Resource['_id']
  view: 'teacher' | 'student'
}

const generalGuideUrl = createReducer(
  null,
  on(fetchData.success, (state, a) => a.generalGuideUrl)
)

const list = createReducer(
  [],
  on(fetchData.success, (state, a) => a.list)
)

const selected = createReducer(
  null,
  on(selectSkill, (state, { skill }) => skill._id),
  on(fetchData.success, (state, a) => get(['list', 0, '_id'], a))
)

const view = createReducer(
  'teacher',
  on(selectSkillView, (state, a) => a.view)
)

export function reducers(state: State, action: Action) {
  return combineReducers({
    generalGuideUrl,
    list,
    view,
    selected,
  })(state, action)
}
