import { Injectable } from '@angular/core'
import { CanActivate } from '@angular/router'
import { ToastService, UsersService } from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, switchMap, tap } from 'rxjs/operators'
import { AbpService } from './abp.service'

@Injectable()
export class AbpGuard implements CanActivate {
  constructor(
    private users: UsersService,
    private service: AbpService,
    private toast: ToastService
  ) {}

  canActivate() {
    return this.users.getProjectiaSsoUrl().pipe(
      tap(({ url }) => this.service.url$.next(url)),
      switchMap(() => of(true)),
      catchError(() => {
        this.toast.showToast(
          'Hubo un error al acceder al módulo de proyectos',
          null,
          { status: 'danger' }
        )
        return of(false)
      })
    )
  }
}
