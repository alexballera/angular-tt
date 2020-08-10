import { Injectable } from '@angular/core'
import formatISO from 'date-fns/formatISO'
import max from 'date-fns/max'
import parseISO from 'date-fns/parseISO'
import forEach from 'lodash/forEach'
import groupBy from 'lodash/groupBy'
import head from 'lodash/head'
import isEmpty from 'lodash/isEmpty'
import mapValues from 'lodash/mapValues'
import round from 'lodash/round'
import sumBy from 'lodash/sumBy'
import { DistributionGroupInContext, SelectedGroupMetric } from '../../models'

@Injectable({
  providedIn: 'root',
})
export class GroupMetricsService {
  getContentProgress(
    selectedGroupMetrics: SelectedGroupMetric,
    selectedGroup: DistributionGroupInContext
  ) {
    let data = {}
    if (!isEmpty(selectedGroupMetrics)) {
      const totalStudents = selectedGroup.users.length
      const contentsMetrics = this.getContentsRelatedMetrics(
        selectedGroupMetrics
      )
      const groupedContentsMetrics = groupBy(contentsMetrics, '_id')

      data = mapValues(groupedContentsMetrics, contents => {
        const contentLatestInteractions = contents
          .filter(content => !!content.metrics.lastInteraction)
          .map(content => parseISO(content.metrics.lastInteraction))
        return {
          ...head(contents),
          metrics: {
            lastInteraction: contentLatestInteractions.length
              ? formatISO(max(contentLatestInteractions))
              : null,
            assets: {
              progress: round(
                sumBy(contents, 'metrics.assets.progress') / totalStudents
              ),
            },
          },
        }
      })
    }
    return data
  }

  getContentsRelatedMetrics(selectedGroupMetrics) {
    const contentsMetrics = []
    forEach(selectedGroupMetrics, studentMetrics => {
      const allContentsMetrics = studentMetrics.all.list
      forEach(allContentsMetrics, content => {
        contentsMetrics.push(content)
      })
    })
    return contentsMetrics
  }
}
