import { Action } from '@ngrx/store'

export class ResetState implements Action {
  static TYPE = 'RESET_STATE'

  readonly type = ResetState.TYPE
}

export class SetRootState implements Action {
  static TYPE = 'SET_ROOT_STATE'

  readonly type = SetRootState.TYPE
  constructor(readonly payload: any) {}
}
