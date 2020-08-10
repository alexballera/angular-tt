import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { GroupMetrics } from '@ticmas/common-interfaces'
import get from 'lodash/get'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DistributionGroupInContext } from '../../../models'
import { ContentsService } from '../../../services/contents.service'
import { DistributionGroupService } from '../../../services/distribution-group.service'
import { CourseMetricsService } from '../../../services/metrics/course.service'
import { GroupMetricsService } from '../../../services/metrics/group-metrics.service'

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss'],
})
export class CourseContentComponent implements OnInit {
  selectedCourseGroups$: Observable<
    Array<DistributionGroupInContext & { metrics: any }>
  >
  constructor(
    private contentsService: ContentsService,
    private groupMetricsService: GroupMetricsService,
    private courseMetricsService: CourseMetricsService,
    private distributionGroupService: DistributionGroupService,
    private router: Router
  ) {}

  ngOnInit() {
    this.selectedCourseGroups$ = combineLatest([
      this.distributionGroupService.selectedCourseGroups$,
      this.courseMetricsService.selectedCourseMetrics$,
    ]).pipe(
      map(([courseGroups, courseMetrics]) => {
        return courseGroups.map(group => {
          const groupsMetrics = get(
            courseMetrics,
            `groups.${group.registration}`,
            {}
          )
          const metrics = this.groupMetricsService.getContentProgress(
            groupsMetrics,
            group
          )
          return {
            ...group,
            contents: group.contents.map(content =>
              this.contentsService.setContentFullData(content)
            ),
            metrics,
          }
        })
      })
    )
  }

  goToLibrary() {
    this.router.navigate(['/biblioteca'])
  }
}
