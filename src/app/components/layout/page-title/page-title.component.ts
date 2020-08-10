import { Component, Input } from '@angular/core'
@Component({
  selector: 'ticmas-page-title',
  templateUrl: './page-title.component.html',
  styleUrls: ['./page-title.component.scss'],
})
export class PageTitleComponent {
  @Input() title: string
  @Input() subtitle1: string
  @Input() subtitle2: string
}
