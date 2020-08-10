import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { selectTeacher, State } from '../../../ngrx'

@Component({
  selector: 'app-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss'],
})
export class TeacherCardComponent implements OnInit {
  @Input() sub
  @Input() avatar
  @Input() name
  @Input() familyName
  @Input() countStudent
  @Input() countCourses
  @Input() courses
  @Input() index
  @Output() detail = new EventEmitter()

  constructor(private store: Store<State>) {}
  acronym: string
  colors = [
    'color-ticmas-1',
    'color-ticmas-2',
    'color-ticmas-3',
    'color-ticmas-4',
  ]

  ngOnInit() {
    this.acronym = this.name.charAt(0) + this.familyName.charAt(0)
  }

  goDetail(id) {
    this.store.dispatch(
      selectTeacher({
        name: this.name,
        family_name: this.familyName,
        sub: this.sub,
        courses: this.courses,
      })
    )
    this.detail.emit(id)
  }
}
