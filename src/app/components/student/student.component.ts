import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import has from 'lodash/has'
import { Observable } from 'rxjs'
import { filter, map, tap } from 'rxjs/operators'
import { StudentData, StudentsMetrics } from '../..//models/student'
import { DistributionGroupInContext } from '../../models'
import { State } from '../../reducers'
import { ContentsService } from '../../services/contents.service'
import { DistributionGroupService } from '../../services/distribution-group.service'
import { StudentMetricsService } from '../../services/metrics/student.service'
import { LayoutService } from '../layout/layout.module'
import { CreateGroupComponent } from './../my-classrooms/create-group/create-group.component'
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  selectedTab = 1
  searchText = null
  showClassPanel = false
  courseHasStudents = false
  selectedStudent = null
  spinner$: Observable<boolean>

  studentData$: Observable<StudentData>
  selectedCourseGroups$: Observable<DistributionGroupInContext[]>

  constructor(
    private store: Store<State>,
    private sidebar: LayoutService,
    private contentsService: ContentsService,
    private studentMetricsService: StudentMetricsService,
    private distributionGroupService: DistributionGroupService
  ) {}

  ngOnInit() {
    this.spinner$ = this.store.select('uiStates', 'loading')
    this.selectedCourseGroups$ = this.distributionGroupService.selectedCourseGroups$.pipe(
      tap(courseGroups => {
        const parentGroup = courseGroups.find(g => !has(g, 'parent'))
        this.courseHasStudents = parentGroup.users.length > 0
        if (this.courseHasStudents) {
          this.selectedStudent = parentGroup.users[0].sub
        }
      })
    )

    this.studentData$ = this.store.select('metrics', 'students').pipe(
      filter(({ selected }) => !!selected),
      map((metrics: StudentsMetrics) => {
        const data = metrics.selected
        return {
          ...data,
          group: {
            ...data.group,
            contents: data.group.contents.map(content =>
              this.contentsService.setContentFullData(content)
            ),
          },
          metrics: this.studentMetricsService.completeRelatedMetricsData(
            data.metrics
          ),
        }
      })
    )
  }

  onSelectStudent(e) {
    this.selectedStudent = e
  }

  openGroupForm() {
    this.sidebar.openSidebar(CreateGroupComponent)
  }

  onSelectTab(e) {
    this.selectedTab = e.tabId
  }
}
