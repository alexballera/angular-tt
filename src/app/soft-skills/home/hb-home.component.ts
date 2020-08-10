import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { NbPopoverDirective } from '@nebular/theme'
import { LayoutService } from '../../components/layout/layout.module'
import { SidebarSkillComponent } from '../sidebar-skill/sidebar-skill.component'
import { SoftSkillsService } from '../soft-skills.service'

@Component({
  selector: 'app-hb-home',
  templateUrl: './hb-home.component.html',
  styleUrls: ['./hb-home.component.scss'],
})
export class HbHomeComponent implements AfterViewInit {
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective
  boxMarginRem = 2

  constructor(
    private service: SoftSkillsService,
    private layoutService: LayoutService
  ) {}

  ngAfterViewInit() {
    this.openOnboarding('soft-skill-onboarding-home')
  }

  openOnboarding(onboarding) {
    if (!this.service.getOnboardingFlag(onboarding)) {
      this.popover.show()
      this.service.setOnboardingFlag(onboarding)
    }
  }

  closeOnboarding() {
    this.popover.hide()
  }

  selectedSkill$ = this.service.selectedSkill$

  skills$ = this.service.list$

  selectSkill(skill) {
    this.service.selectSkill(skill)
    this.layoutService.openSidebar(SidebarSkillComponent, {
      closeOnBackdropClick: true,
      closeOnEsc: true,
      hasBackdrop: false,
      hasScroll: true,
      dialogClass: 'hsxxi-home-dialog',
    })
  }
}
