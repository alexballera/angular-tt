import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-month-interaction',
  templateUrl: './month-interaction.component.html',
  styleUrls: ['./month-interaction.component.scss'],
})
export class MonthInteractionComponent {
  @Input() type = 'default'
  @Input() title = 'student'
  @Input() hours = '00'
  @Input() minutes = '00'
}
