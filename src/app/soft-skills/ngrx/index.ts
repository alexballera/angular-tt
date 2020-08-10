import { createFeatureSelector, createSelector } from '@ngrx/store'
import { featureName } from './ngrx.module'
import { State } from './reducers'

const featureSelector = createFeatureSelector<State>(featureName)

export const generalGuideSelector = createSelector(
  featureSelector,
  s => s.generalGuideUrl
)

export const selectedSkillIdSelector = createSelector(
  featureSelector,
  s => s.selected
)
export const selectedSkillViewSelector = createSelector(
  featureSelector,
  s => s.view
)

export const listSelector = createSelector(featureSelector, s => s.list)
export const selectedSkillSelector = createSelector(
  listSelector,
  selectedSkillIdSelector,
  (list, id) => list.find(({ _id }) => _id === id)
)

export * from './actions'
