import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'ticmas-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent {
  @Input() resource
  @Input() resultsContent
  @Output() resourceSelected = new EventEmitter<any>()
  @Output() resourceAsign = new EventEmitter<any>()

  defaultImage = '/img/cover.svg'
  openSelected(r) {
    this.resourceSelected.emit(r)
  }
  asignSelected(e) {
    e.stopPropagation()
    this.resourceAsign.emit(this.resource)
  }
}
