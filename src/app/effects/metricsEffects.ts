import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'
import { Store } from '@ngrx/store'
import { CourseMetrics, WeeklyInteraction } from '@ticmas/common-interfaces'
import { MetricsService } from '@ticmas/common-services'
import get from 'lodash/get'
import { forkJoin, of } from 'rxjs'
import {
  catchError,
  concatMap,
  filter,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators'
import { DistributionGroupActions, MetricsActions } from '../actions'
import { LoadingActions } from '../actions/loading'
import { State } from '../reducers'
import { StudentMetricsService } from '../services/metrics/student.service'
import { PlanificationService } from '../services/planification.service'

@Injectable()
export class MetricsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<State>,
    private metricsService: MetricsService,
    private planificationService: PlanificationService,
    private studentMetricsService: StudentMetricsService
  ) {}

  @Effect()
  getCourseMetrics$ = this.actions$.pipe(
    ofType(DistributionGroupActions.FETCH),
    switchMap<any, any>(() => {
      const actions = [
        MetricsActions.getCoursesMetrics(),
        MetricsActions.getCoursesMetricsFromLastWeek(),
        MetricsActions.getGroupsMetrics(),
      ]
      return of(...actions)
    })
  )

  @Effect()
  getGroupsMetrics$ = this.actions$.pipe(
    ofType(MetricsActions.GET_GROUPS_METRICS),
    switchMap<any, any>(() => {
      return forkJoin([
        this.metricsService.getContentInteraction(),
        this.metricsService.getWeeklyStudentInteractions(),
      ]).pipe(
        switchMap<any, any>(([contentAvgInteraction, weeklyInteractions]) => {
          const metrics = {
            contentAvgInteraction,
            weeklyInteractions,
          }
          return of(MetricsActions.getGroupsMetricsSuccess(metrics))
        }),
        catchError(err => {
          return of(MetricsActions.getGroupsMetricsFailure(err))
        })
      )
    })
  )

  @Effect()
  getMetricsOnGroupSelection$ = this.actions$.pipe(
    ofType(
      DistributionGroupActions.SELECT,
      DistributionGroupActions.FETCH_SUCCESS
    ),
    concatMap(action =>
      of(action).pipe(withLatestFrom(this.planificationService.selectedGroup$))
    ),
    filter(([, group]) => !!group),
    switchMap<any, any>(([, group]) => {
      return of(
        LoadingActions.loadingSite(true),
        MetricsActions.getStudentMetrics(null),
        MetricsActions.getSelectedGroupMetrics(group)
      )
    })
  )

  @Effect()
  getSelectedGroupMetrics$ = this.actions$.pipe(
    ofType(MetricsActions.GET_SELECTED_GROUP_METRICS),
    withLatestFrom(this.store.select('metrics', 'courses')),
    switchMap<any, any>(([{ payload }, { requested }]) => {
      const course = payload.course._id
      const foundCourse = requested.find(r => r.course === course)
      let courseGroupsMetrics = {
        course,
        parentGroup: payload,
        metrics: foundCourse ? foundCourse.metrics : {},
      }
      if (!payload.users.length || foundCourse) {
        return of(
          MetricsActions.getSelectedGroupMetricsSuccess(courseGroupsMetrics)
        )
      }
      return this.metricsService.getMyCourseGroups({ course }).pipe(
        switchMap<CourseMetrics, any>(metrics => {
          courseGroupsMetrics = {
            ...courseGroupsMetrics,
            metrics,
          }
          return of(
            MetricsActions.getSelectedGroupMetricsSuccess(courseGroupsMetrics)
          )
        }),
        catchError(err => {
          return of(MetricsActions.getSelectedGroupMetricsFailure(err))
        })
      )
    })
  )

  @Effect()
  getGroupFirstStudentMetrics$ = this.actions$.pipe(
    ofType(MetricsActions.GET_SELECTED_GROUP_METRICS_SUCCESS),
    switchMap<any, any>(({ payload }) => {
      const firstStudentMetrics = this.studentMetricsService.getGroupFirstStudentMetrics(
        payload
      )
      return of(
        LoadingActions.loadingSite(false),
        MetricsActions.getStudentMetrics(firstStudentMetrics)
      )
    }),
    catchError(err => {
      return of(MetricsActions.getStudentMetricsFailure(err))
    })
  )

  @Effect()
  getCoursesMetrics$ = this.actions$.pipe(
    ofType(MetricsActions.GET_COURSES_METRICS),
    switchMap<any, any>(() => {
      return this.metricsService.getMyCourses().pipe(
        switchMap<any, any>((metrics: CourseMetrics) => {
          return of(MetricsActions.getCoursesMetricsSuccess(metrics))
        }),
        catchError(err => {
          return of(MetricsActions.getCoursesMetricsFailure(err))
        })
      )
    })
  )

  @Effect()
  getCoursesMetricsFromLastWeek$ = this.actions$.pipe(
    ofType(MetricsActions.GET_COURSES_METRICS_FROM_LAST_WEEK),
    switchMap<any, any>(() => {
      return this.metricsService.getMyCourses({ lastInteraction: 7 }).pipe(
        switchMap<any, any>((metrics: CourseMetrics) => {
          return of(
            MetricsActions.getCoursesMetricsFromLastWeekSuccess(metrics)
          )
        }),
        catchError(err => {
          return of(MetricsActions.getCoursesMetricsFromLastWeekFailure(err))
        })
      )
    })
  )

  @Effect()
  getStudentMetrics$ = this.actions$.pipe(
    ofType(MetricsActions.GET_STUDENT_METRICS),
    switchMap<any, any>(({ payload }) =>
      of(MetricsActions.getStudentMetricsSuccess(payload))
    ),
    catchError(err => {
      return of(MetricsActions.getStudentMetricsFailure(err))
    })
  )

  @Effect()
  getStudentWeeklyInteractionsMetrics$ = this.actions$.pipe(
    ofType(MetricsActions.GET_STUDENT_METRICS_SUCCESS),
    withLatestFrom(this.store.select('metrics', 'students')),
    switchMap<any, any>(([{ payload }, { weeklyInteractions }]) => {
      const student = get(payload, ['info', 'preferred_username'], null)
      const foundRelatedMetrics = weeklyInteractions.find(
        ({ actor }) => actor === student
      )
      if (!student || foundRelatedMetrics) {
        return of()
      }
      return this.metricsService
        .getWeeklyStudentInteractions({
          actor: student,
        })
        .pipe(
          switchMap<any, any>((interactions: WeeklyInteraction[]) =>
            of(
              MetricsActions.getStudentWeeklyMetricsSuccess({
                actor: student,
                results: interactions,
              })
            )
          ),
          catchError(err => {
            return of(MetricsActions.getStudentWeeklyMetricsFailure(err))
          })
        )
    })
  )
}
