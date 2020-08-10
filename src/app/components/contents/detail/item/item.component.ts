import { Component, Input, OnChanges } from '@angular/core'
import { Asset, RelatedMetric } from '@ticmas/common-interfaces'
import get from 'lodash/get'
import has from 'lodash/has'

@Component({
  selector: 'app-content-detail-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ContentListItemComponent implements OnChanges {
  @Input() asset: Asset
  @Input() metrics: RelatedMetric[]
  @Input() isCourseView: boolean = false

  relatedMetrics: RelatedMetric
  isAnActivity: boolean = false
  hasScoreSuccessInfo: boolean = false

  ngOnChanges() {
    this.relatedMetrics =
      this.metrics.find(m => m.object_id === this.asset._id) || {}

    this.hasScoreSuccessInfo = has(this.relatedMetrics, 'last_score.success')
    this.isAnActivity =
      this.hasScoreSuccessInfo || has(this.relatedMetrics, 'last_score.score')
  }
}
