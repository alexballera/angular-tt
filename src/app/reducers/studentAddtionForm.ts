import { ValidationErrors } from '@angular/forms'
import {
  createFormGroupState,
  formGroupReducer,
  updateGroup,
  validate,
} from 'ngrx-forms'
import { required, minLength, maxLength, pattern } from 'ngrx-forms/validation'

export const FORM_ID = 'STUDENT_ADDTION_FORM'

export interface Name {
  given_name: string
  family_name: string
}

export interface Password {
  password: string
  confirmPassword: string
}

export interface StudentAdditionFormValue {
  preferred_username: string
  password: Password
  name: Name
}

export const InitialStudentAdditionFormValue = createFormGroupState<
  StudentAdditionFormValue
>(FORM_ID, {
  preferred_username: null,
  password: {
    password: null,
    confirmPassword: null,
  },
  name: {
    given_name: null,
    family_name: null,
  },
})

declare module 'ngrx-forms/src/state' {
  interface ValidationErrors {
    passwordMatch?: Password
    passwordPatternMatch?: Password
  }
}

function validatePassword(value: Password): ValidationErrors {
  const passwordRegex = /^(?=^\S*$)(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{6,}$/
  return !passwordRegex.test(value.password)
    ? { passwordPatternMatch: value }
    : value.password === value.confirmPassword
    ? {}
    : { passwordMatch: value }
}

const validateAndUpdateForm = updateGroup<StudentAdditionFormValue>({
  preferred_username: validate(
    required,
    minLength(7),
    maxLength(25),
    pattern(/^[^ ]+$/)
  ),
  password: state => {
    state = validate(state, validatePassword)
    return updateGroup<Password>(state, {
      password: validate(required, minLength(6)),
    })
  },
  name: updateGroup<Name>({
    given_name: validate(required),
    family_name: validate(required),
  }),
})

export function studentAdditionForm(
  state: any = InitialStudentAdditionFormValue,
  action
) {
  return validateAndUpdateForm(formGroupReducer(state, action))
}
