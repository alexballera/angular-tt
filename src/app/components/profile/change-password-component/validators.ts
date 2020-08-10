import { FormGroup } from '@angular/forms'
import get from 'lodash/get'

export function passwordValidator() {
  return (formGroup: FormGroup) => {
    const password = get(formGroup.controls, 'password')
    const confirmPassword = get(formGroup.controls, 'confirmPassword')

    let passwordErrors = {}

    if (!letterMatch(password.value)) {
      passwordErrors = {
        ...passwordErrors,
        letterError: true,
      }
    }

    if (!numberMatch(password.value)) {
      passwordErrors = {
        ...passwordErrors,
        numberError: true,
      }
    }

    if (!minLengthMatch(password.value)) {
      passwordErrors = {
        ...passwordErrors,
        lengthError: true,
      }
    }

    if (!passwordMatch(password.value, confirmPassword.value)) {
      passwordErrors = {
        ...passwordErrors,
        passwordMatchError: true,
      }
    }

    if (!patternMatch(password.value)) {
      passwordErrors = {
        ...passwordErrors,
        passwordInvalid: true,
      }
    }

    if (!password.value) {
      passwordErrors = {
        ...passwordErrors,
        required: true,
      }
    }

    password.setErrors(passwordErrors)
  }
}

export function letterMatch(password: string) {
  const letterRegex = /(?=.*[a-zA-Z])/
  return letterRegex.test(password)
}

export function numberMatch(password: string) {
  const numberRegex = /(?=.*[0-9])/
  return numberRegex.test(password)
}

export function minLengthMatch(password: string) {
  const minLengthRegex = /^.{8,}$/
  return minLengthRegex.test(password)
}

export function passwordMatch(password: string, confirmPassword: string) {
  return password === confirmPassword
}

export function patternMatch(password: string) {
  const passwordRegex = /^(?=^\S*$)(?=.*[a-zA-Z])(?=.*\d).{8,}$/
  return passwordRegex.test(password)
}
