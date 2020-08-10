import { Component, Input } from '@angular/core'
import { LayoutService } from '../../../../../components/layout/layout.module'

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
})
export class AccordionComponent {
  @Input() data: any
  url = ''
  youtube = false

  constructor(public sidebar: LayoutService) {}

  selectAttachments(attachment) {
    window.open(attachment)
  }
}
