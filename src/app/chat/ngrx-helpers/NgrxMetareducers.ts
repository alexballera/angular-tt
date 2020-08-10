import { ActionReducer } from '@ngrx/store'
import { ResetState, SetRootState } from './actions'

// @dynamic
export class NgrxMetareducers {
  static TIMESTAMP = Symbol('TIMESTAMP')

  static resetState(reducer: ActionReducer<any>): ActionReducer<any, any> {
    return function x(state, action) {
      return reducer(
        action.type === ResetState.TYPE ? undefined : state,
        action
      )
    }
  }

  static setRootState(
    reducer: ActionReducer<any>
  ): ActionReducer<any, SetRootState> {
    return function x(state, action) {
      return action.type === SetRootState.TYPE
        ? action.payload
        : reducer(state, action)
    }
  }

  static timestamp(reducer: ActionReducer<any>): ActionReducer<any> {
    return function x(state, action) {
      return reducer(state, {
        [NgrxMetareducers.TIMESTAMP]: Date.now(),
        ...action,
      })
    }
  }
}
