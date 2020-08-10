import { Injectable } from '@angular/core'
import { Actions, Effect, ofType } from '@ngrx/effects'

import { IntegrationsService } from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, switchMap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'
import {
  ClassroomIntegrationActions,
  ContextActions,
  DistributionGroupActions,
} from './../actions'

@Injectable()
export class ClassroomIntegrationEffects {
  constructor(
    private actions$: Actions,
    private integrationsService: IntegrationsService
  ) {}

  @Effect()
  syncClassroomCourses$ = this.actions$.pipe(
    ofType(ClassroomIntegrationActions.SYNC_CLASSROOM_COURSES),
    switchMap<any, any>(() => {
      return this.integrationsService.synchronizeIntegrationCourses().pipe(
        switchMap((res: any) => {
          if (res.updatedRole) {
            window.location.reload()
          }
          return of(
            ClassroomIntegrationActions.syncClassroomCoursesSuccess(),
            DistributionGroupActions.fetch(),
            ContextActions.fetch()
          )
        }),
        catchError(() => {
          return of(ClassroomIntegrationActions.syncClassroomCoursesFailure())
        })
      )
    })
  )

  includesSome(roles: string[], ...values: string[]) {
    for (const value of values) {
      if (roles.includes(value)) {
        return true
      }
    }
    return false
  }
}
