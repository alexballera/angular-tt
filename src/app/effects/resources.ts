import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { RmService, ToastService } from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { GroupEditActions, ResourcesActions, UiStatesActions } from '../actions'
import { LoadingActions } from '../actions/loading'
import { S3UploadService } from '../services/s3-upload.service'

@Injectable()
export class ResourcesEffects {
  constructor(
    private actions$: Actions,
    private rm: RmService,
    private s3: S3UploadService,
    private toast: ToastService,
    private router: Router
  ) {}

  @Effect()
  ResourceUploadRm$ = this.actions$.pipe(
    ofType(ResourcesActions.SAVE_RESOURCE_CUSTOM_RM),
    switchMap<any, any>(({ payload }) =>
      this.rm.createResource({}).pipe(
        switchMap(res =>
          of(
            ResourcesActions.saveResourceCustomS3({
              id: res._id,
              data: payload,
            })
          )
        ),
        catchError(err =>
          of(
            this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
              status: 'danger',
            }),
            LoadingActions.loadingSite(false)
          )
        )
      )
    )
  )

  @Effect()
  ResourceUploadS3$ = this.actions$.pipe(
    ofType(ResourcesActions.SAVE_RESOURCE_CUSTOM_S3),
    switchMap<any, any>(({ payload }) =>
      this.s3.uploadFile(payload.id, payload.data.file).pipe(
        switchMap(res =>
          of(
            ResourcesActions.updateResourceCustomRm({
              id: payload.id,
              data: payload.data,
              res,
            })
          )
        ),
        catchError(err =>
          of(
            LoadingActions.loadingSite(false),
            this.toast.showToast(
              'Ha ocurrido un error, intenta nuevamente',
              null,
              { status: 'danger' }
            )
          )
        )
      )
    )
  )

  @Effect()
  SaveResourceCdms$ = this.actions$.pipe(
    ofType(ResourcesActions.SAVE_RESOURCE_CUSTOM_CDMS),
    switchMap<any, any>(({ payload }) =>
      of(
        GroupEditActions.setContentDuration(payload.data.data.duration),
        GroupEditActions.setContentDate(payload.data.data.startDate),
        GroupEditActions.setContentTheme(payload.data.data.theme),
        GroupEditActions.setContentResources([
          {
            abstract: payload.data.data.abstract,
            _id: payload.resultUpdate._doc._id,
            processed_at: payload.data.data.startDate,
            subtitle: '',
            tags: payload.data.data.tags,
            title: payload.data.data.title,
            type: payload.data.data.type,
            url: payload.data.res.key,
            user: payload.resultUpdate._doc.user,
            zipUrl: payload.data.res.key,
          },
        ]),
        GroupEditActions.saveContents({}),
        LoadingActions.loadingSite(false),
        UiStatesActions.showAddContentCustom(false),
        UiStatesActions.showAddContentCustom(false),
        this.toast.showToast('Se creó el contenido de manera exitosa', null, {
          status: 'success',
        })
      )
    ),
    catchError(err => {
      this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
        status: 'danger',
      })
      return of()
    })
  )

  @Effect()
  getResource$ = this.actions$.pipe(
    ofType(ResourcesActions.GET_RESOURCE),
    switchMap<any, any>(({ payload }) =>
      this.rm.getResource(payload).pipe(
        switchMap(resource =>
          of(
            ResourcesActions.getResourceSuccess(resource),
            LoadingActions.loadingSite(false)
          )
        ),
        catchError(err => {
          this.router.navigate(['./biblioteca/'])
          return of(
            ResourcesActions.getResourceFailure(err),
            LoadingActions.loadingSite(false)
          )
        })
      )
    )
  )
}
