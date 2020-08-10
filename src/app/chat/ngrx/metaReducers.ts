import { ActionReducer } from '@ngrx/store'
import { ChatActionTypes } from './actions'

export function resetState(
  reducer: ActionReducer<any>
): ActionReducer<any, any> {
  return (state, action) => {
    return reducer(
      action.type === ChatActionTypes.LOGOUT ? undefined : state,
      action
    )
  }
}

export const metaReducers = [resetState]
