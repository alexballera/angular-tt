import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Store } from '@ngrx/store'
import { ContentData, UserInfo } from '@ticmas/common-interfaces'
import { Observable } from 'rxjs'
import { MetricsActions } from '../../../actions'
import { DistributionGroupInContext } from '../../../models'
import { State } from '../../../reducers'
import { StudentMetricsService } from '../../../services/metrics/student.service'

@Component({
  selector: 'app-student-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class StudentListComponent implements OnInit {
  @Input() isFirst: boolean = false
  @Input() isActive: boolean = false
  @Input() student: UserInfo
  @Input() selectedGroup: DistributionGroupInContext
  @Output() selectedStudent = new EventEmitter()
  spinner$: Observable<boolean>
  studentMetrics$: Observable<{
    all: ContentData
    active: ContentData
  }>
  comment = null

  studentContextMenu = [
    { title: 'Quitar de la clase' },
    { title: 'Resetear contraseña' },
    { title: 'Agregar a un grupo' },
  ]

  defaultAvatar: string = '/defaultAvatar.svg'

  constructor(
    private store: Store<State>,
    private studentMetricsService: StudentMetricsService
  ) {}

  ngOnInit() {
    this.spinner$ = this.store.select('uiStates', 'loading')
    this.studentMetrics$ = this.studentMetricsService.getMetrics(
      this.student,
      this.selectedGroup
    )
  }

  onSelectStudent(metrics) {
    this.selectedStudent.emit(this.student.sub)
    const data = {
      info: this.student,
      group: this.selectedGroup,
      metrics,
    }
    this.store.dispatch(MetricsActions.getStudentMetrics(data))
  }
}
