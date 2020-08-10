import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { NbMenuItem, NbThemeService } from '@nebular/theme'
import { Store } from '@ngrx/store'
import { of } from 'rxjs'
import { environment } from '../../../environments/environment'
import { ContextActions } from '../../actions'
import { LayoutService } from '../../services/layout.service'
import { fetchData, State } from '../ngrx'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  public logoUrl = environment.skin
    ? '/' + environment.skin + 'Logo.png'
    : '/ticmas-logo-large.svg'
  constructor(
    private store: Store<State>,
    private themeService: NbThemeService,
    public layoutService: LayoutService
  ) {}

  sidenavItems: NbMenuItem[] = [
    {
      title: 'Inicio',
      link: '/director',
      icon: 'home-outline',
    },
  ]

  apps$ = of([])

  ngOnInit(): void {
    this.store.dispatch(ContextActions.fetch())
    this.store.dispatch(fetchData.request())
    this.themeService.changeTheme('director')
  }
}
