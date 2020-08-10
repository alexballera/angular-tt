import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormControl } from '@angular/forms'

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss'],
})
export class DateSelectorComponent {
  @Input() componentLabel: string
  @Output() dateChange = new EventEmitter<any>()

  formControl = new FormControl(new Date())
  ngModelDate = new Date()

  handleDateChange(date) {
    this.dateChange.emit(date)
  }
}
