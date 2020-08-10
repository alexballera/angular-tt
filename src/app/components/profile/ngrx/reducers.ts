import { createReducer } from 'typesafe-actions'
import { passwordChange, showPasswordForm, togglePasswordForm } from './actions'

export interface State {
  passwordFormVisible: boolean
  passwordChange: {
    success: boolean
    error: boolean
  }
}

const passwordFormVisible = createReducer<State['passwordFormVisible']>(
  false
).handleAction(showPasswordForm, (_, { payload }) => payload)

const passwordChangeSuccess = createReducer<State['passwordChange']>({
  success: false,
  error: false,
})
  .handleAction(passwordChange.success, state => ({ ...state, success: true }))
  .handleAction(passwordChange.failure, state => ({
    ...state,
    success: false,
    error: true,
  }))
  .handleAction(togglePasswordForm, state => ({
    ...state,
    success: false,
    error: false,
  }))

export const reducers = {
  passwordFormVisible,
  passwordChangeSuccess,
}
