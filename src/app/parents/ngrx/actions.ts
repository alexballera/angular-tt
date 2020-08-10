import { createAction, props } from '@ngrx/store'

export const fetchData = {
  request: createAction('[Parent] FETCH_DATA_REQUEST'),
  success: createAction(
    '[Parent] FETCH_DATA_SUCCESS',
    props<{ list: any[] }>()
  ),
  failure: createAction('[Parent] FETCH_DATA_FAILURE', props<Error>()),
}

export const fetchMetrics = {
  request: createAction('[Parent] FETCH_METRICS_REQUEST'),
  success: createAction(
    '[Parent] FETCH_METRICS_SUCCESS',
    props<{ metrics: any }>()
  ),
  failure: createAction('[Parent] FETCH_METRICS_FAILURE', props<Error>()),
}
