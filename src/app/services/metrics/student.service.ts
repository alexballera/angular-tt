import { Injectable } from '@angular/core'
import {
  ContentAvgInteraction,
  ContentData,
  ContentList,
  UserInfo,
} from '@ticmas/common-interfaces'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import get from 'lodash/get'
import head from 'lodash/head'
import mapValues from 'lodash/mapValues'
import sumBy from 'lodash/sumBy'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { DistributionGroupInContext } from '../../models'
import { StudentData, StudentRelatedMetrics } from '../../models/student'
import { CourseMetricsService } from './course.service'

@Injectable({
  providedIn: 'root',
})
export class StudentMetricsService {
  constructor(private courseMetricsService: CourseMetricsService) {}

  getMetrics(
    student: UserInfo,
    selectedGroup: DistributionGroupInContext
  ): Observable<{
    all: ContentData
    active: ContentData
  }> {
    return this.courseMetricsService.selectedCourseMetrics$.pipe(
      map(selectedCourseMetrics => {
        const courseMetrics = selectedCourseMetrics.groups
        return this.getStudentMetricsFromGroup(
          student,
          selectedGroup,
          courseMetrics
        )
      })
    )
  }

  getGroupFirstStudentMetrics(data) {
    const selectedGroup = data.parentGroup
    const selectedCourseMetrics = data.metrics
    const firstStudent = get(selectedGroup, 'users.[0]', {})
    const metrics = this.getStudentMetricsFromGroup(
      firstStudent,
      selectedGroup,
      selectedCourseMetrics
    )

    return { info: firstStudent, group: selectedGroup, metrics }
  }

  private getStudentMetricsFromGroup(
    student: UserInfo,
    selectedGroup: DistributionGroupInContext,
    selectedCourseMetrics: any,
    contents?: string
  ) {
    const studentMetrics = get(
      selectedCourseMetrics,
      [selectedGroup.registration, student.preferred_username],
      {}
    )
    const metrics =
      contents === 'active'
        ? this.getActiveContentsMetrics(studentMetrics)
        : contents === 'all'
        ? this.getAllContentsMetrics(studentMetrics)
        : studentMetrics
    return metrics
  }

  private getAllContentsMetrics(metrics) {
    return get(metrics, 'all')
  }

  private getActiveContentsMetrics(metrics) {
    return get(metrics, 'active')
  }

  getLastInteraction(lastInteraction) {
    lastInteraction = lastInteraction
      ? parseISO(lastInteraction)
      : lastInteraction
    return {
      month: lastInteraction
        ? format(lastInteraction, 'MMMM', { locale: es })
        : null,
      day: lastInteraction ? format(lastInteraction, 'dd') : null,
    }
  }

  getAvgInteraction(
    contentAvgInteraction: ContentAvgInteraction[],
    studentData: StudentData
  ) {
    const avgInteractions: ContentAvgInteraction = head(
      this.getContentAvgInteraction(contentAvgInteraction, studentData)
    )
    return {
      hours: get(avgInteractions, 'total_hours', 0),
      minutes: get(avgInteractions, 'total_minutes', 0),
    }
  }

  getContentAvgInteraction(
    contentAvgInteraction: ContentAvgInteraction[],
    studentData: StudentData
  ) {
    return get(
      contentAvgInteraction,
      [studentData.group.registration, studentData.info.preferred_username],
      []
    )
  }

  completeRelatedMetricsData(metrics: StudentRelatedMetrics) {
    const allContents = get(metrics, 'all', {})
    const activeContents = get(metrics, 'active', {})
    return {
      ...metrics,
      all: {
        ...allContents,
        list: this.checkAssetCompletition(get(allContents, 'list', {})),
      },
      active: {
        ...activeContents,
        list: this.checkAssetCompletition(get(activeContents, 'list', {})),
      },
    }
  }

  checkAssetCompletition(contents: ContentList) {
    return mapValues(contents, content => {
      let relatedMetrics = content.relatedMetrics
      const parentAssets = relatedMetrics.filter(({ embed }) => !embed)
      parentAssets.forEach(asset => {
        const embeds = relatedMetrics.filter(
          ({ embed, object_id }) =>
            object_id.startsWith(asset.object_id) && embed
        )
        if (embeds.length) {
          const totalCompleted = sumBy(embeds, embed =>
            get(embed, 'completed') ? 1 : 0
          )
          asset = {
            ...asset,
            completed: totalCompleted === embeds.length,
          }
          relatedMetrics = relatedMetrics.filter(
            related => related.object_id !== asset.object_id
          )
          relatedMetrics.push(asset)
        }
      })
      const results = { ...content, relatedMetrics }
      return results
    })
  }
}
