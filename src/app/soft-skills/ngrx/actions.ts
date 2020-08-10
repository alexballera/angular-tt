import { createAction, props } from '@ngrx/store'
import { Resource } from '@ticmas/common-interfaces'

export const fetchData = {
  request: createAction('[Soft Skills] FETCH_DATA_REQUEST'),
  success: createAction(
    '[Soft Skills] FETCH_DATA_SUCCESS',
    props<{
      generalGuideUrl: string
      list: Resource[]
    }>()
  ),
  failure: createAction('[Soft Skills] FETCH_DATA_FAILURE', props<Error>()),
}

export const selectSkill = createAction(
  '[Soft Skills] SELECT_SKILL',
  props<{ skill: Resource }>()
)

export const selectSkillView = createAction(
  '[Soft Skills] SELECT_SKILL_VIEW',
  props<{ view: 'teacher' | 'student' }>()
)
