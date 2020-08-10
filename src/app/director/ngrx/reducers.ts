import { Action, combineReducers, createReducer, on } from '@ngrx/store'
import { DistributionGroupInContext } from '@ticmas/common-interfaces'
import { Metrics } from '../services/metrics.service'
import { fetchData, fetchMetrics, resetTeacher, selectTeacher } from './actions'

export interface State {
  distributionGroups: {
    list: DistributionGroupInContext[]
    metrics: Metrics
  }
  teacher: {}
}

const metrics = createReducer(
  {},
  on(fetchMetrics.success, (state, a) => a)
)

const teacher = createReducer(
  {},
  on(selectTeacher, (state, a) => a),
  on(resetTeacher, ({}, a) => a)
)

const distributionGroups = combineReducers({
  list: createReducer(
    [],
    on(fetchData.success, (state, a) => a.list)
  ),
  metrics,
})

export function reducers(state: State, action: Action) {
  return combineReducers({
    distributionGroups,
    teacher,
  })(state, action)
}
