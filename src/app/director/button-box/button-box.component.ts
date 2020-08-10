import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-button-box',
  templateUrl: './button-box.component.html',
  styleUrls: ['./button-box.component.scss'],
})
export class ButtonBoxComponent {
  @Input() title: string
  @Input() value: number
}
