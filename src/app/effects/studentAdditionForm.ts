import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { UsersService } from '@ticmas/common-services'
import { MarkAsSubmittedAction, SetUserDefinedPropertyAction } from 'ngrx-forms'
import { of } from 'rxjs'
import {
  catchError,
  filter,
  shareReplay,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators'
import { StudentAdditionFormActions, UsersActions } from '../actions'
import { InitialStudentAdditionFormValue, State } from '../reducers'
import { StudentAdditionService } from '../services/student-addition.service'

@Injectable()
export class StudentAdditionFormEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private users: UsersService,
    private studentAdditionService: StudentAdditionService
  ) {}

  formState$ = this.store.select('studentAdditionForm')

  @Effect()
  checkUser$ = this.actions$.pipe(
    ofType(StudentAdditionFormActions.CHECK_USER),
    withLatestFrom(this.formState$, this.store.select('distributionGroup')),
    filter(
      ([, form]) =>
        form.controls.preferred_username.isDirty &&
        form.controls.preferred_username.isValid
    ),
    shareReplay(),
    switchMap<any, any>(([, form, { list, selection }]) => {
      const selectedGroup = list.find(l => l._id === selection)
      const preferredUsername = form.value.preferred_username.toLowerCase()
      const studentExistsInCourse = selectedGroup.users.find(
        user => user.preferred_username === preferredUsername
      )
      const actions: any[] = this.studentAdditionService.registeredUserActions(
        studentExistsInCourse
      )
      if (!studentExistsInCourse) {
        actions.push(StudentAdditionFormActions.getUser(preferredUsername))
      }
      return of(...actions)
    })
  )

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(StudentAdditionFormActions.GET_USER),
    switchMap<any, any>(({ payload }) => {
      return this.users.getUsers({ preferred_username: payload }).pipe(
        switchMap(([user]) => {
          const actions: any[] = user
            ? this.studentAdditionService.existingUserActions(user)
            : this.studentAdditionService.newUserActions()

          actions.push(
            new SetUserDefinedPropertyAction(
              InitialStudentAdditionFormValue.controls.preferred_username.id,
              'success',
              true
            )
          )
          return of(...actions)
        }),
        catchError(err =>
          of(StudentAdditionFormActions.getUserFailure(err.message))
        )
      )
    })
  )

  @Effect()
  resetForm$ = this.actions$.pipe(
    ofType(StudentAdditionFormActions.RESET_FORM),
    switchMap(() => {
      const actions = this.studentAdditionService.resetActions()
      return of(...actions)
    }),
    catchError(err => of())
  )

  @Effect()
  submitedSuccess$ = this.actions$.pipe(
    ofType(UsersActions.SAVE_SUCCESS),
    switchMap(() =>
      of(new MarkAsSubmittedAction(InitialStudentAdditionFormValue.id))
    ),
    catchError(err => of())
  )

  @Effect()
  submitedFailure$ = this.actions$.pipe(
    ofType(UsersActions.SAVE_FAILURE),
    switchMap(() =>
      of(
        new SetUserDefinedPropertyAction(
          InitialStudentAdditionFormValue.id,
          'error',
          true
        )
      )
    ),
    catchError(err => of())
  )
}
