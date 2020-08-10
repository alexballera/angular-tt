import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-accordion-actions',
  templateUrl: './accordion-actions.component.html',
  styleUrls: ['./accordion-actions.component.scss'],
})
export class AccordionActionsComponent {
  @Input() data: any
}
