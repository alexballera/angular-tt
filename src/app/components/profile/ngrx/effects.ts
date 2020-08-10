import { Inject, Injectable } from '@angular/core'
import { Actions, Effect } from '@ngrx/effects'
import { AuthService } from '@ticmas/auth-service'
import {
  S3Environment,
  S3UploadService,
  ToastService,
  UsersService,
} from '@ticmas/common-services'
import { of } from 'rxjs'
import {
  catchError,
  concatMap,
  filter,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators'
import { isActionOf } from 'typesafe-actions'
import { LayoutService } from '../../layout/layout.service'
import { passwordChange, updateUser } from './actions'

@Injectable()
export class ProfileEffects {
  constructor(
    @Inject('ENV') private environment: S3Environment,
    private actions$: Actions,
    private auth: AuthService,
    private users: UsersService,
    private s3: S3UploadService,
    private layoutService: LayoutService,
    private toastr: ToastService
  ) {}

  @Effect()
  changePassword$ = this.actions$.pipe(
    filter(isActionOf(passwordChange.request)),
    switchMap<any, any>(({ payload }) =>
      this.users.changeOwnPassword(payload).pipe(
        switchMap(() => {
          this.layoutService.closeSidebar()
          return of(
            this.toastr.showToast(
              'La contraseña ha sido actualizada exitosamente',
              null,
              { status: 'success' }
            )
          )
        }),
        catchError(err => {
          return of(
            this.toastr.showToast(
              'Ocurrió un error al tratar de actualizar la contraseña',
              null,
              { status: 'danger' }
            )
          )
        })
      )
    )
  )

  @Effect()
  updateUser$ = this.actions$.pipe(
    filter(isActionOf(updateUser.request)),
    withLatestFrom(this.auth.userInfo$),
    switchMap(([{ payload }, { sub }]) =>
      this.users.updateUser(sub, { userinfo: payload }).pipe(
        tap(updated => this.auth.updateUserInfo(updated)),
        switchMap(() => {
          this.toastr.showToast(
            'Información de usuario actualizada correctamente',
            null,
            { status: 'success' }
          )
          return of(updateUser.success())
        }),
        catchError(err => {
          this.toastr.showToast(
            'Ocurrió un error al tratar de actualizar la información de usuario',
            null,
            { status: 'danger' }
          )
          return of(updateUser.failure(err))
        })
      )
    )
  )
}
