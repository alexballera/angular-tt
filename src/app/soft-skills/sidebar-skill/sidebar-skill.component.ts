import {
  AfterViewInit,
  Component,
  QueryList,
  ViewChildren,
} from '@angular/core'
import { Router } from '@angular/router'
import { NbPopoverDirective } from '@nebular/theme'
import { LayoutService } from '../../components/layout/layout.module'
import { SoftSkillsService } from '../soft-skills.service'

@Component({
  selector: 'app-sidebar-skill',
  templateUrl: './sidebar-skill.component.html',
  styleUrls: ['./sidebar-skill.component.scss'],
})
export class SidebarSkillComponent implements AfterViewInit {
  @ViewChildren(NbPopoverDirective) onboardings: QueryList<NbPopoverDirective>
  constructor(
    private service: SoftSkillsService,
    private layoutService: LayoutService,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.openOnboarding('soft-skill-onboarding-popup')
  }

  openOnboarding(onboarding) {
    if (!this.service.getOnboardingFlag(onboarding)) {
      this.onboardings.first.show()
      this.service.setOnboardingFlag(onboarding)
    }
  }

  selectedSkill$ = this.service.selectedSkill$

  public goToSkill(view) {
    this.router.navigate(['habilidades-siglo-xxi', 'habilidad'])
    this.service.selectSkillView(view)
    this.layoutService.closeSidebar()
  }

  public close() {
    this.layoutService.closeSidebar()
  }

  nextOnboarding() {
    this.onboardings.first.hide()
    this.onboardings.last.show()
  }

  closeOnboarding() {
    this.onboardings.last.hide()
  }
}
