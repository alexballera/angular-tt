import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { createEffect } from '@ngrx/effects'
import { ImpersonationService } from '@ticmas/auth-service'
import { of } from 'rxjs'
import { skip, switchMap, tap } from 'rxjs/operators'
import { ResetState } from '../../ngrx-helpers'

@Injectable()
export class ImpersonationEffects {
  constructor(
    private impersonationService: ImpersonationService,
    private router: Router
  ) {}

  clearStateAndRedirect = createEffect(() =>
    this.impersonationService.impersonating$.pipe(
      skip(1),
      tap(impersonating => {
        this.router.navigate(impersonating ? ['/'] : ['/tutor-docentes'])
      }),
      switchMap(() => of(new ResetState()))
    )
  )
}
