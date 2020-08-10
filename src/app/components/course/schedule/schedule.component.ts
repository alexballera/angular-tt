import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ContextService } from '../../../services/context.service'

import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
})
export class ScheduleComponent {
  @Input() day
  @Output() extras = new EventEmitter()

  form1: FormGroup

  constructor(private fb: FormBuilder, private contextService: ContextService) {
    this.form1 = this.fb.group({
      extra_hours: this.fb.array([
        new FormGroup({
          extra_from: new FormControl(null),
          extra_to: new FormControl(null),
        }),
      ]),
    })
  }

  setSchedule(day) {
    this.extras.emit({ day, extras: this.form1.value.extra_hours })
    this.form1.reset()
  }

  changeHourFrom(e) {
    this.form1.get('extra_from').setValue(e.target.valueAsDate)
  }

  changeHourTo(e) {
    this.form1.get('extra_to').setValue(e.target.valueAsDate)
  }

  removeHour(i) {
    if (i > 0) {
      ;(this.form1.get('extra_hours') as FormArray).removeAt(i)
    }
  }
}
