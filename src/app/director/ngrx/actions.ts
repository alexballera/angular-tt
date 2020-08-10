import { createAction, props } from '@ngrx/store'
import { DistributionGroupInContext } from '@ticmas/common-interfaces'
import { Metrics } from '../services/metrics.service'

export const fetchData = {
  request: createAction('[Director] FETCH_DATA_REQUEST'),
  success: createAction(
    '[Director] FETCH_DATA_SUCCESS',
    props<{ list: DistributionGroupInContext[] }>()
  ),
  failure: createAction('[Director] FETCH_DATA_FAILURE', props<Error>()),
}

export const fetchMetrics = {
  request: createAction('[Director] FETCH_METRICS_REQUEST'),
  success: createAction('[Director] FETCH_METRICS_SUCCESS', props<Metrics>()),
  failure: createAction('[Director] FETCH_METRICS_FAILURE', props<Error>()),
}

export const selectTeacher = createAction(
  '[Director] SELECT_TEACHER_SUCCESS',
  props<{ name: string; family_name: string; sub: string; courses: [] }>()
)

export const resetTeacher = createAction('[Director] RESET_TEACHER')
