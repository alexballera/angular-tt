import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { NbMenuItem, NbThemeService } from '@nebular/theme'
import { LayoutService } from '../../services/layout.service'

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./layout.component.scss'],
})
export class RTLayoutComponent implements OnInit {
  constructor(
    public layoutService: LayoutService,
    private themeService: NbThemeService
  ) {}

  sidenavItems: NbMenuItem[] = []

  ngOnInit() {
    this.themeService.changeTheme('default')
  }
}
