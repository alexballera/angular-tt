import { Component, ElementRef, ViewChild } from '@angular/core'
import { SoftSkillsService } from '../soft-skills.service'

@Component({
  selector: 'app-general-guide',
  templateUrl: './general-guide.component.html',
  styleUrls: ['./general-guide.component.scss'],
})
export class GeneralGuideComponent {
  @ViewChild('dialog', { static: true }) dialog: ElementRef
  constructor(private service: SoftSkillsService) {}

  guideUrl$ = this.service.generalGuide$
}
