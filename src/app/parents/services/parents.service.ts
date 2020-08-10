import { Injectable } from '@angular/core'
import { of } from 'rxjs'
import { ParentsMetricsService } from './metrics.service'

@Injectable({
  providedIn: 'root',
})
export class ParentsService {
  constructor(private parentsMetricsService: ParentsMetricsService) {}

  isLoading$ = of(false)

  courseList$ = this.parentsMetricsService.courseList$
  statusCounter$ = this.parentsMetricsService.statusCounter$
}
