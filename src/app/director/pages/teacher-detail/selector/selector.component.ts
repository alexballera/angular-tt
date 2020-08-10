import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DirectorMetricsService } from '../../../services/metrics.service'

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectorComponent implements OnInit {
  groups$: Observable<any[]>
  selectedGroup$: Observable<any>
  @Output() course = new EventEmitter()

  constructor(public metrics: DirectorMetricsService) {}

  ngOnInit() {
    this.selectedGroup$ = this.metrics.selectTeacher$.pipe(
      map(teacher => {
        if (teacher.courses.length > 0) {
          this.course.emit(0)
          return 0
        }
      })
    )
  }

  selectCourse(i) {
    this.course.emit(i)
  }
}
