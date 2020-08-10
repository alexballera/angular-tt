import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { ImpersonationService } from '@ticmas/auth-service'
import { CdmsService, MetricsService } from '@ticmas/common-services'
import { forkJoin, Observable, of } from 'rxjs'
import { catchError, filter, switchMap } from 'rxjs/operators'
import { fetchData, fetchMetrics } from './actions'

@Injectable()
export class ParentsEffects {
  constructor(
    private actions$: Actions,
    private cdms: CdmsService,
    private metrics: MetricsService,
    private impersonationService: ImpersonationService
  ) {}

  clearUpdateImpersonatedData$: Observable<any> = createEffect(() =>
    this.impersonationService.impersonating$.pipe(
      filter(Boolean),
      switchMap(() => {
        return of(fetchData.request())
      })
    )
  )

  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchData.request),
      switchMap(() =>
        forkJoin([
          this.cdms.getDistributionGroups(),
          this.metrics.getMyMetrics(),
        ]).pipe(
          switchMap(([distributionGroups, myMetrics]) => {
            return of(
              fetchData.success({ list: distributionGroups }),
              fetchMetrics.success({ metrics: myMetrics })
            )
          }),
          catchError(err => of(fetchData.failure(err)))
        )
      )
    )
  )
}
