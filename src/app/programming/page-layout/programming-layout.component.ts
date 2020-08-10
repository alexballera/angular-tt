import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { NbMenuItem, NbThemeService } from '@nebular/theme'
import { LayoutService } from '../../services/layout.service'

@Component({
  selector: 'app-programming-layout',
  templateUrl: './programming-layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./programming-layout.component.scss'],
})
export class ProgrammingLayoutComponent implements OnInit {
  constructor(
    private themeService: NbThemeService,
    public layoutService: LayoutService
  ) {}

  sidenavItems: NbMenuItem[] = [
    {
      title: 'Foro',
      link: '/programacion',
      icon: 'message-circle-outline',
      selected: true,
    },
    {
      title: 'Compilador',
      link: '/programacion/compilador',
      icon: 'code-outline',
    },
  ]

  ngOnInit() {
    this.themeService.changeTheme('programming')
  }
}
