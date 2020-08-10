import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, Effect, ofType } from '@ngrx/effects'
import {
  AssignmentsService,
  SubmissionsService,
  ToastService,
} from '@ticmas/common-services'
import { of } from 'rxjs'
import {
  catchError,
  concatMap,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators'
import { HomeworkService } from '../components/homework/homework.service'
import { PlanificationService } from '../services/planification.service'
import { AssignmentActions, SubmissionsActions } from './../actions'
import { DistributionGroupActions } from './../actions/distributionGroup'
@Injectable()
export class AssignmentEffects {
  constructor(
    private actions$: Actions,
    private assignment: AssignmentsService,
    private toast: ToastService,
    private planificationService: PlanificationService,
    private homeworkService: HomeworkService,
    private router: Router
  ) {}
  @Effect()
  getAssignments$ = this.actions$.pipe(
    ofType(AssignmentActions.GET_ASSIGNMENTS, DistributionGroupActions.SELECT),
    filter(Boolean),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.planificationService.selectedGroup$))
    ),
    switchMap<any, any>(([, { course }]) => {
      return this.assignment.getCourseAssignments(course._id).pipe(
        switchMap((res: any) => {
          if (res.length) {
            return of(
              AssignmentActions.getAssignmentsSuccess(res),
              AssignmentActions.getStudentAssignments(res[0].id)
            )
          }
          return of(AssignmentActions.getAssignmentsSuccess(res))
        }),
        catchError(() => {
          return of(AssignmentActions.getAssignmentsFailure())
        })
      )
    })
  )

  @Effect()
  getStudentAssignments$ = this.actions$.pipe(
    ofType(AssignmentActions.GET_STUDENT_ASSIGNMENTS),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.planificationService.selectedGroup$))
    ),
    switchMap<any, any>(([{ payload }, { course }]) => {
      return this.assignment
        .getStudentAssignments({ assignmentId: payload, courseId: course._id })
        .pipe(
          switchMap(res =>
            of(AssignmentActions.getStudentAssignmentsSuccess(res))
          ),
          catchError(() => {
            this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
              status: 'danger',
            })
            return of(AssignmentActions.getStudentAssignmentsFailure())
          })
        )
    })
  )

  @Effect()
  getAssignmentSubmissions$ = this.actions$.pipe(
    ofType(AssignmentActions.GET_SUBMISSIONS),
    concatMap(action =>
      of(action).pipe(
        withLatestFrom(this.homeworkService.selectedStudentAssignmentId$)
      )
    ),
    switchMap<any, any>(([, studentAssignmentId]) => {
      return this.assignment
        .getStudentAssignmentsSubmissions(studentAssignmentId)
        .pipe(
          switchMap(res =>
            of(AssignmentActions.getAssignmentSubmissionsSuccess(res))
          ),
          catchError(() => {
            this.toast.showToast('Algo salió mal, intenta nuevamente', null, {
              status: 'danger',
            })
            return of(AssignmentActions.getAssignmentSubmissionsFailure())
          })
        )
    })
  )
}
