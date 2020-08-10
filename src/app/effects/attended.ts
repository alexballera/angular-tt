import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { EomtService, ToastService } from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators'

import { AttendedActions } from '../actions'
import { LoadingActions } from '../actions/loading'

@Injectable()
export class AttendedEffects {
  constructor(
    private actions$: Actions,
    private eomt: EomtService,
    private toast: ToastService
  ) {}

  @Effect()
  getAttended$ = this.actions$.pipe(
    ofType(AttendedActions.GET_ATTENDED),
    switchMap<any, any>(({ payload }) =>
      this.eomt.getAttendancesByCourse(payload).pipe(
        switchMap(res => of(AttendedActions.getAttendedSuccess(res))),
        catchError(err => {
          this.toast.showToast('Algo falló, intenta nuevamente.', null, {
            status: 'danger',
          })
          return of()
        })
      )
    )
  )

  @Effect()
  SaveAttended$ = this.actions$.pipe(
    ofType(AttendedActions.SAVE_ATTENDED),
    switchMap<any, any>(({ payload }) =>
      this.eomt.setAttendances(payload).pipe(
        switchMap(res =>
          of(
            AttendedActions.saveAttendedSuccess(payload),
            LoadingActions.loadingSite(false)
          )
        ),
        catchError(err => {
          this.toast.showToast('Algo falló, intenta nuevamente.', null, {
            status: 'danger',
          })
          return err
        })
      )
    )
  )
}
