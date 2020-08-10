import { Component, OnInit } from '@angular/core'
import { GroupMetrics } from '@ticmas/common-interfaces'
import { Observable } from 'rxjs'
import { DistributionGroupInContext } from '../../models'
import { ContextService } from './../../services/context.service'

@Component({
  selector: 'app-my-classrooms',
  templateUrl: './my-classrooms.component.html',
  styleUrls: ['./my-classrooms.component.scss'],
})
export class MyClassroomsComponent implements OnInit {
  panelIndex = 3
  groupsMetrics: GroupMetrics
  groupContentsMetrics: any
  selectedTab = 1

  hasHomework$: Observable<boolean>
  selectedCourseGroups$: Observable<
    Array<DistributionGroupInContext & { metrics: any }>
  >

  constructor(private contextService: ContextService) {}

  ngOnInit() {
    this.hasHomework$ = this.contextService.hasHomework$
  }
}
