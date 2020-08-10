import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core'
import { NbMenuService, NbThemeService } from '@nebular/theme'
import { AuthService } from '@ticmas/auth-service'
import { filter, map } from 'rxjs/operators'
import { SubSink } from 'subsink'
import { LayoutService } from '../../services/layout.service'

@Component({
  selector: 'app-parents-layout',
  templateUrl: './parents-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./parents-layout.component.scss'],
})
export class ParentsLayoutComponent implements OnInit, OnDestroy {
  private subs = new SubSink()
  constructor(
    private nbMenuService: NbMenuService,
    private themeService: NbThemeService,
    public layoutService: LayoutService,
    private authService: AuthService
  ) {}

  menuItems = [
    {
      title: 'Cambiar contraseña',
      payload: {
        action: 'change-password',
        url: '',
      },
    },
    {
      title: 'Ayuda',
      payload: {
        action: 'goto',
        url: '',
      },
    },
    {
      title: 'Contacto',
      payload: {
        action: 'goto',
        url: '',
      },
    },
    {
      title: 'Cerrar sesión',
      payload: {
        action: 'logout',
      },
    },
  ]

  ngOnInit() {
    this.themeService.changeTheme('parents')

    this.subs.add(
      this.nbMenuService
        .onItemClick()
        .pipe(
          filter(({ tag }) => tag === 'header-menu'),
          map(({ item }) => item)
        )
        .subscribe((data: any) => {
          if (data.payload.action === 'logout') {
            this.authService.logout()
          }
        })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }
}
