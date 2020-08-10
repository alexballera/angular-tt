import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { SubmissionsService, ToastService } from '@ticmas/common-services'
import { of } from 'rxjs'
import {
  catchError,
  concatMap,
  filter,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators'
import { SubmissionsActions } from './../actions/submissions'
import { HomeworkService } from './../components/homework/homework.service'

@Injectable()
export class SubmissionsEffects {
  constructor(
    private actions$: Actions,
    private submissionsService: SubmissionsService,
    private homeworkService: HomeworkService,
    private toast: ToastService,
    private router: Router,
    private submissions: SubmissionsService,
    private store: Store<any>
  ) {}
  @Effect()
  updateStudentSubmissionStatus$ = this.actions$.pipe(
    ofType(SubmissionsActions.UPDATE_STUDENT_SUBMISSION_STATUS),
    withLatestFrom(this.homeworkService.selectedStudentAssignmentId$),
    switchMap<any, any>(([{ payload }, studentAssignmentId]) => {
      return this.submissionsService
        .updateStudentSubmission(
          payload.submissionId,
          studentAssignmentId,
          payload.grade
            ? {
                state: payload.state,
                grade: payload.grade,
              }
            : { state: payload.state }
        )
        .pipe(
          switchMap(() => {
            this.toast.showToast('Entrega finalizada correctamente', null, {
              status: 'success',
            })
            return of(
              SubmissionsActions.updateStudentSubmissionStatusSuccess({
                ...payload,
                studentAssignmentId,
              })
            )
          }),
          catchError(() => {
            this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
              status: 'danger',
            })
            return of(SubmissionsActions.updateStudentSubmissionStatusFailure())
          })
        )
    })
  )

  @Effect()
  addComment$ = this.actions$.pipe(
    ofType(SubmissionsActions.ADD_COMMENT),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(this.homeworkService.selectedStudentAssignment$)
      )
    ),
    switchMap<any, any>(([{ payload }, studentAssignment]) => {
      const submissionId = studentAssignment.submissions[payload.index].id
      return this.submissions
        .createAssignmentComments(submissionId, studentAssignment.id, {
          text: payload.data,
        })
        .pipe(
          switchMap(res =>
            payload.submissionState
              ? of(
                  SubmissionsActions.addCommentSuccess({
                    ...res,
                    studentAssignmentId: studentAssignment.id,
                  }),
                  SubmissionsActions.updateStudentSubmissionStatus({
                    submissionId,
                    state: payload.submissionState,
                    grade: payload.score,
                  })
                )
              : of(
                  SubmissionsActions.addCommentSuccess({
                    ...res,
                    studentAssignmentId: studentAssignment.id,
                  })
                )
          ),
          catchError(() => {
            this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
              status: 'danger',
            })
            return of(SubmissionsActions.addCommentFailure())
          })
        )
    })
  )
}
