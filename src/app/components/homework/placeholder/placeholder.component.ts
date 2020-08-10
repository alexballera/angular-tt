import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-homework-placeholder',
  templateUrl: './placeholder.component.html',
  styleUrls: ['./placeholder.component.scss'],
})
export class HomeworkPlaceholderComponent {
  @Input() text: string
  @Input() icon: string
  @Input() textFontSize: number
  @Input() iconWidth: number
}
