import { Component, Input } from '@angular/core'
import { DirectorMetricsService } from '../../../services/metrics.service'

@Component({
  selector: 'app-assigned-content',
  templateUrl: './assigned-content.component.html',
  styleUrls: ['./assigned-content.component.scss'],
})
export class AssignedContentComponent {
  @Input() courseSelect

  constructor(public metricsServices: DirectorMetricsService) {}
}
