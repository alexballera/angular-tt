import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { CdmsService, MetricsService } from '@ticmas/common-services'
import { forkJoin, of } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { fetchData, fetchMetrics } from './actions'

@Injectable()
export class DirectorEffects {
  constructor(
    private http: HttpClient,
    private actions$: Actions,
    private cdms: CdmsService,
    private metrics: MetricsService
  ) {}

  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchData.request),
      switchMap(() =>
        forkJoin([
          this.cdms.getAllDistributionGroup(),
          this.metrics.getDirectorCourses(),
          this.metrics.getDirectorQuarterlyInteractions(),
          this.metrics.getDirectorMonthlyInteraction(),
        ]).pipe(
          switchMap(
            ([
              distributionGroups,
              coursesMetrics,
              quarterlyInteractions,
              monthlyAvgInteraction,
            ]) => {
              return of(
                fetchData.success({ list: distributionGroups }),
                fetchMetrics.success({
                  courses: coursesMetrics,
                  quarterlyInteractions,
                  monthlyAvgInteraction,
                })
              )
            }
          ),
          catchError(err => of(fetchData.failure(err)))
        )
      )
    )
  )
}
