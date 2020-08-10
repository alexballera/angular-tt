import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Router } from '@angular/router'
import { NbMenuItem, NbThemeService } from '@nebular/theme'
import { Observable } from 'rxjs'
import { ContextService } from 'src/app/services/context.service'
import { environment } from '../../../environments/environment'
import { LayoutService } from '../../services/layout.service'
import { SoftSkillsService } from '../soft-skills.service'

@Component({
  selector: 'app-hb-layout',
  templateUrl: './hb-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./hb-layout.component.scss'],
})
export class HbLayoutComponent implements OnInit {
  public logoUrl = environment.skin
    ? '/' + environment.skin + 'Logo.png'
    : '/ticmas-logo-large.svg'
  hasTraining$: Observable<boolean>

  constructor(
    private themeService: NbThemeService,
    public layoutService: LayoutService,
    public softSkillsService: SoftSkillsService,
    private router: Router,
    private contextService: ContextService
  ) {}

  navigateSkill(skill) {
    this.softSkillsService.selectSkill(skill)
    this.router.navigate(['habilidades-siglo-xxi', 'habilidad'])
  }

  sidenavItems: NbMenuItem[] = [
    {
      title: 'Inicio',
      link: '/habilidades-siglo-xxi',
      icon: 'home-outline',
      selected: true,
    },
    {
      title: 'Manual de uso',
      link: '/habilidades-siglo-xxi/manual-de-uso',
      icon: 'map-outline',
    },
  ]

  ngOnInit() {
    this.themeService.changeTheme('hb')
    this.hasTraining$ = this.contextService.hasTraining$
  }
}
