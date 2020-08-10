import { Injectable } from '@angular/core'
import {
  AuthService as BaseAuthService,
  ImpersonationService,
} from '@ticmas/auth-service'
import { first, switchMap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: BaseAuthService,
    private impersonationService: ImpersonationService
  ) {}

  userInfo$ = this.impersonationService.impersonating$.pipe(
    switchMap(impersonating =>
      impersonating
        ? this.impersonationService.impersonatedUser$
        : this.auth.userInfo$
    )
  )

  getUserRoles(includeRealmRoles: boolean) {
    return this.impersonationService.impersonating$
      .pipe(first())
      .toPromise()
      .then(impersonating =>
        impersonating
          ? this.impersonationService.getUserRoles(includeRealmRoles)
          : this.auth.getUserRoles(includeRealmRoles)
      )
  }
}
