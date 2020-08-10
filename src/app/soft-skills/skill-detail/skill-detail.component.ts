import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { LayoutService } from '../../components/layout/layout.module'
import { ContentPublicatorComponent } from '../../components/library/content-publicator/content-publicator.component'
import { ContentsService } from '../../services/contents.service'
import { SoftSkillsService } from '../soft-skills.service'

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.component.html',
  styleUrls: ['./skill-detail.component.scss'],
})
export class SkillDetailComponent {
  selectedSkill$ = this.service.selectedSkill$
  view$ = this.service.selectedSkillView$
  skillDetail$: Observable<{ skill: any; view: string }>

  currentView: string

  constructor(
    private service: SoftSkillsService,
    private layoutService: LayoutService,
    public contentsService: ContentsService
  ) {}

  changeView(view) {
    this.service.selectSkillView(view)
  }

  assignContent(skill) {
    this.contentsService.setResource(skill)

    this.layoutService.openSidebar(ContentPublicatorComponent)
  }
}
