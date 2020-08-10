import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { RmService } from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { fetchData, selectSkill } from './actions'

@Injectable()
export class SoftSkillEffects {
  constructor(
    private actions$: Actions,
    private router: Router,
    private rm: RmService
  ) {}

  fetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchData.request),
      switchMap(() =>
        this.rm.getSoftSkills().pipe(
          switchMap(data => of(fetchData.success(data))),
          catchError(err => of(fetchData.failure(err)))
        )
      )
    )
  )

  selectSkill$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(selectSkill),
        tap(() => {
          if (this.router.url !== '/habilidades-siglo-xxi') {
            this.router.navigate(['habilidades-siglo-xxi', 'habilidad'])
          }
        })
      ),
    { dispatch: false }
  )
}
