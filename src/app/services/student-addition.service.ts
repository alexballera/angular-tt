import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
  StudentAdditionFormValue,
  State,
  InitialStudentAdditionFormValue,
} from '../reducers'
import {
  FormGroupState,
  SetValueAction,
  ResetAction,
  SetUserDefinedPropertyAction,
  DisableAction,
  EnableAction,
  ValidationErrors,
} from 'ngrx-forms'
import { Store } from '@ngrx/store'
import { pluck } from 'rxjs/operators'
import { StudentAdditionFormActions, UsersActions } from '../actions'
@Injectable({
  providedIn: 'root',
})
export class StudentAdditionService {
  constructor(private store: Store<State>) {}

  formState$: Observable<
    FormGroupState<StudentAdditionFormValue>
  > = this.store.select('studentAdditionForm')

  formStateErrors$: Observable<ValidationErrors> = this.formState$.pipe(
    pluck('errors')
  )

  addNewStudent() {
    this.store.dispatch(UsersActions.save())
  }

  associateStudent() {
    this.store.dispatch(UsersActions.saveUserCdms())
  }

  newUserActions() {
    return [
      new EnableAction(InitialStudentAdditionFormValue.controls.password.id),
      new EnableAction(InitialStudentAdditionFormValue.controls.name.id),
      new SetValueAction(
        InitialStudentAdditionFormValue.controls.name.id,
        InitialStudentAdditionFormValue.controls.name.value
      ),
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.controls.password.id,
        'show',
        true
      ),
    ]
  }

  existingUserActions(user) {
    return [
      new DisableAction(InitialStudentAdditionFormValue.controls.password.id),
      new DisableAction(InitialStudentAdditionFormValue.controls.name.id),
      new SetValueAction(InitialStudentAdditionFormValue.controls.name.id, {
        ...user,
      }),
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.controls.password.id,
        'show',
        false
      ),
    ]
  }

  registeredUserActions(studentExistsInCourse) {
    return [
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.controls.preferred_username.id,
        'registered',
        studentExistsInCourse
      ),
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.controls.preferred_username.id,
        'success',
        false
      ),
    ]
  }

  resetActions() {
    return [
      new ResetAction(InitialStudentAdditionFormValue.id),
      new SetValueAction(
        InitialStudentAdditionFormValue.id,
        InitialStudentAdditionFormValue.value
      ),
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.controls.preferred_username.id,
        'success',
        false
      ),
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.controls.password.id,
        'show',
        false
      ),
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.controls.preferred_username.id,
        'registered',
        false
      ),
      new SetUserDefinedPropertyAction(
        InitialStudentAdditionFormValue.id,
        'error',
        false
      ),
    ]
  }

  resetForm() {
    this.store.dispatch(StudentAdditionFormActions.resetForm())
  }
}
