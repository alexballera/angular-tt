import { Action, combineReducers, createReducer, on } from '@ngrx/store'
import {
  ContentData,
  DistributionGroupInContext,
} from '@ticmas/common-interfaces'
import { fetchData, fetchMetrics } from './actions'

export interface State {
  distributionGroups: {
    list: DistributionGroupInContext[]
    metrics: { [key: string]: { all: ContentData; active: ContentData } }
  }
}

const metrics = createReducer(
  {},
  on(fetchMetrics.success, (state, a) => a.metrics)
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
  })(state, action)
}
