import { DOCUMENT } from '@angular/common'
import { Inject, Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect } from '@ngrx/effects'
import { RoleDenied } from '@ticmas/auth-service'
import { filter, tap } from 'rxjs/operators'
import { AuthService } from '../services/auth.service'

@Injectable()
export class RouterEffects {
  constructor(
    private router: Router,
    private authService: AuthService,
    @Inject('ENV') private environment,
    @Inject(DOCUMENT) private document: Document
  ) {}

  @Effect({ dispatch: false })
  redirectOn$ = this.router.events.pipe(
    filter(event => event instanceof RoleDenied),
    tap(() => {
      this.authService.getUserRoles(true).then(roles => {
        if (roles.includes('student')) {
          this.document.location.href = this.environment.domains.scl
        }

        if (roles.includes('administrative')) {
          this.document.location.href = this.environment.domains.eomt
        }

        if (roles.includes('tutor')) {
          this.router.navigate(['/tutor-docentes'])
        }

        if (roles.includes('director')) {
          this.router.navigate(['/director'])
        }

        if (roles.includes('parent')) {
          this.router.navigate(['/padres'])
        }
      })
    })
  )
}
