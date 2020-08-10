import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import {
  CdmsService,
  EomtService,
  ToastService,
  UsersService,
} from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators'
import { UiStatesActions, UsersActions } from '../actions'
import { LoadingActions } from '../actions/loading'
import { State } from '../reducers'
import { S3UploadService } from '../services/s3-upload.service'

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private cdms: CdmsService,
    private eomt: EomtService,
    private users: UsersService,
    private store: Store<State>,
    private s3: S3UploadService,
    private toast: ToastService
  ) {}

  @Effect()
  saveUser$ = this.actions$.pipe(
    ofType(UsersActions.SAVE),
    withLatestFrom(this.store.select('studentAdditionForm')),
    switchMap<any, any>(([, form]) => {
      const user = {
        userinfo: {
          ...form.value.name,
          preferred_username: form.value.preferred_username,
        },
        password: form.value.password.password,
        role: 'student',
      }
      return this.users.createUser(user).pipe(
        switchMap(res => of(UsersActions.saveUserEomt(res))),
        catchError(() => of(UsersActions.saveFailure(user)))
      )
    })
  )

  @Effect()
  addUserToEomt$ = this.actions$.pipe(
    ofType(UsersActions.SAVE_USER_EOMT),
    switchMap<any, any>(({ payload }) => {
      return this.eomt.createStudent(payload).pipe(
        switchMap(res => of(UsersActions.saveUserCdms(payload))),
        catchError(() => of(UsersActions.saveFailure(payload)))
      )
    })
  )

  @Effect()
  addUserToDistributionGroup$ = this.actions$.pipe(
    ofType(UsersActions.SAVE_USER_CDMS),
    withLatestFrom(
      this.store.select('studentAdditionForm'),
      this.store.select('distributionGroup', 'selection')
    ),
    switchMap<any, any>(([{ payload }, form, groupId]) => {
      const user = payload ? payload : form.value.name
      return this.cdms.addUserToDistributionGroup(groupId, user).pipe(
        switchMap(() => of(UsersActions.saveSuccess({ groupId, user }))),
        catchError(() => of(UsersActions.saveFailure(user)))
      )
    })
  )

  @Effect()
  removeUserFromDistributionGroup$ = this.actions$.pipe(
    ofType(UsersActions.DELETE_USER_CDMS),
    mergeMap<any, any>(({ payload: { groupId, userId } }) => {
      return this.cdms.removeUserFromDistributionGroup(groupId, userId).pipe(
        switchMap(() => {
          return of(
            LoadingActions.loadingSite(false),
            UsersActions.deleteSuccess({ groupId, userId }),
            this.toast.showToast(
              'Se ha elimninado el estudiante de manera exitosa',
              null,
              { status: 'success' }
            )
          )
        }),
        catchError(err => {
          this.toast.showToast('Algo falló, intenta nuevamente', null, {
            status: 'danger',
          })
          return of(UsersActions.deleteFailure(err))
        })
      )
    })
  )
  /**
   * Validar quien tiene el derecho de eliminar un alumno de un curso, pues puede tener varios
   * grupos de distribución asignados
   */
  @Effect()
  removeUserFromEomt$ = this.actions$.pipe(
    ofType(UsersActions.DELETE_USER_EOMT),
    switchMap<any, any>(({ payload: { groupId, userId, courseId } }) =>
      this.eomt.deletePersonFromGroup(courseId, userId).pipe(
        switchMap(() =>
          of(
            UsersActions.deleteSuccess({ groupId, userId }),
            LoadingActions.loadingSite(false)
          )
        ),
        catchError(err => of(UsersActions.deleteFailure(err)))
      )
    )
  )

  @Effect()
  getUserEomt$ = this.actions$.pipe(
    ofType(UsersActions.GET_USER_EOMT),
    switchMap<any, any>(({ payload }) =>
      this.eomt.getPerson(payload).pipe(
        switchMap(user => of(UsersActions.getUserEomtSuccess(user))),
        catchError(err => of(UsersActions.getUserEomtFailure(err)))
      )
    )
  )

  @Effect()
  previewPhotoUpload$ = this.actions$.pipe(
    ofType(UsersActions.PREVIEW_UPLOAD),
    switchMap<any, any>(({ payload }) =>
      this.s3.uploadFile(payload.preferred_username, payload.picture).pipe(
        switchMap(res =>
          of(
            UsersActions.previewUploadSuccess({
              userinfo: {
                ...payload,
                picture: res.Location.replace('s3.amazonaws.com/', ''),
              },
            }),
            UsersActions.updateProfile(payload.sub)
          )
        ),
        catchError(err => of(UsersActions.previewUploadFailure(err)))
      )
    )
  )

  @Effect()
  updateProfile$ = this.actions$.pipe(
    ofType(UsersActions.UPDATE_PROFILE),
    withLatestFrom(this.store.select('userEomt')),
    mergeMap<any, any>(([action, params]) =>
      this.users.updateUser(action.payload, params).pipe(
        switchMap<any, any>(() => {
          this.toast.showToast('Se editó el perfil de manera exitosa', null, {
            status: 'success',
          })
          return of(LoadingActions.loadingSite(false))
        }),
        catchError(err => of(UsersActions.updateProfileFailure(err)))
      )
    )
  )

  @Effect()
  resetPassword$ = this.actions$.pipe(
    ofType(UsersActions.RESET_PASSWORD),
    switchMap<any, any>(({ payload }) =>
      this.users.resetUserPassword(payload.sub).pipe(
        switchMap<any, any>(({ password }) =>
          of(
            UsersActions.resetPasswordSuccess({ ...payload, password }),
            UiStatesActions.showModalResetPassword(true),
            LoadingActions.loadingSite(false)
          )
        ),
        catchError(err => of(UsersActions.resetPasswordFailure(err)))
      )
    )
  )

  @Effect()
  saveUserFailure$ = this.actions$.pipe(
    ofType(UsersActions.SAVE_FAILURE),
    switchMap<any, any>(({ payload }) => {
      return this.users.deleteUser(payload.sub).pipe(
        switchMap(res => of(UsersActions.deleteSuccess(res))),
        catchError(err => of(UsersActions.deleteFailure(err)))
      )
    })
  )

  @Effect()
  failed$ = this.actions$.pipe(
    ofType(
      UsersActions.DELETE_FAILURE,
      UsersActions.RESET_PASSWORD_FAILURE,
      UsersActions.GET_USER_EOMT_FAILURE,
      UsersActions.UPDATE_PROFILE_FAILURE,
      UsersActions.PREVIEW_UPLOAD_FAILURE
    ),
    switchMap<any, any>(() => {
      this.toast.showToast('Algo falló, intenta nuevamente', null, {
        status: 'danger',
      })
      return of()
    })
  )
}
