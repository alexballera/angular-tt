import { Component, OnInit } from '@angular/core'
import { NbThemeService } from '@nebular/theme'
import { Observable } from 'rxjs'
import { ContextService } from 'src/app/services/context.service'
import { environment } from '../../../environments/environment'
import { LayoutService } from '../../services/layout.service'
import { AbpService } from '../abp.service'

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
})
export class PageLayoutComponent implements OnInit {
  public logoUrl = environment.skin
    ? '/' + environment.skin + 'Logo.png'
    : '/ticmas-logo-large.svg'
  q = ''
  hasTraining$: Observable<boolean>

  constructor(
    private themeService: NbThemeService,
    public layoutService: LayoutService,
    public service: AbpService,
    private contextService: ContextService
  ) {}

  ngOnInit() {
    this.themeService.changeTheme('abp')
    this.hasTraining$ = this.contextService.hasTraining$
  }
}
