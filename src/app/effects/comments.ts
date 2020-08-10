import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { EomtService, ToastService } from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { CommentsActions, UiStatesActions } from '../actions'
import { LoadingActions } from '../actions/loading'

@Injectable()
export class CommentsEffects {
  constructor(
    private actions$: Actions,
    private eomt: EomtService,
    private toast: ToastService
  ) {}

  @Effect()
  comments$ = this.actions$.pipe(
    ofType(CommentsActions.GET_COMMENTS),
    switchMap<any, any>(({ payload }) =>
      this.eomt.getStudentComments(payload).pipe(
        switchMap(student =>
          of(
            CommentsActions.getCommentsSuccess(student),
            UiStatesActions.loadingSmall(false),
            LoadingActions.loadingSite(false)
          )
        ),
        catchError(err => {
          return of(
            UiStatesActions.loadingSmall(false),
            LoadingActions.loadingSite(false),
            this.toast.showToast('Algo falló, intenta nuevamente.', null, {
              status: 'danger',
            })
          )
        })
      )
    )
  )

  @Effect()
  saveComment$ = this.actions$.pipe(
    ofType(CommentsActions.SAVE_COMMENT),
    switchMap<any, any>(({ payload }) =>
      this.eomt.createStudentComment(payload.student, payload.data).pipe(
        switchMap(() =>
          of(
            this.toast.showToast(
              'Se ha agregado el comentario de manera exitosa',
              null,
              { status: 'success' }
            ),
            LoadingActions.loadingSite(false),
            UiStatesActions.loadingSmall(false),
            UiStatesActions.showComments(),
            CommentsActions.getComments(payload.student)
          )
        ),
        catchError(err => {
          return of(
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            }),
            LoadingActions.loadingSite(false),
            UiStatesActions.loadingSmall(false)
          )
        })
      )
    )
  )

  @Effect()
  updateComment$ = this.actions$.pipe(
    ofType(CommentsActions.UPDATE_COMMENT),
    switchMap<any, any>(({ payload: { student, commentId, comment } }) =>
      this.eomt.updateStudentComment(student, commentId, comment).pipe(
        switchMap(() =>
          of(
            this.toast.showToast(
              'Se ha actualizado el comentario de manera exitosa',
              null,
              { status: 'success' }
            ),
            UiStatesActions.loadingSmall(false)
          )
        ),
        catchError(err => {
          return of(
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            }),
            UiStatesActions.loadingSmall(false)
          )
        })
      )
    )
  )

  @Effect()
  deleteComment$ = this.actions$.pipe(
    ofType(CommentsActions.DELETE_COMMENT),
    switchMap<any, any>(({ payload: { student, commentId } }) =>
      this.eomt.deleteStudentComment(student, commentId).pipe(
        switchMap(() =>
          of(
            UiStatesActions.loadingSmall(false),
            this.toast.showToast(
              'Se ha eliminado el comentario de manera exitosa',
              null,
              { status: 'success' }
            ),
            CommentsActions.deleteCommentSuccess(commentId)
          )
        ),
        catchError(err => {
          return of(
            this.toast.showToast('Algo falló, intenta nuevamente', null, {
              status: 'danger',
            }),
            UiStatesActions.loadingSmall(false)
          )
        })
      )
    )
  )
}
