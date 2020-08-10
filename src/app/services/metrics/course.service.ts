import { Injectable } from '@angular/core'
import { Store } from '@ngrx/store'
import { GroupMetrics, WeeklyInteraction } from '@ticmas/common-interfaces'
import get from 'lodash/get'
import toArray from 'lodash/toArray'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { State } from '../../reducers'

@Injectable({
  providedIn: 'root',
})
export class CourseMetricsService {
  constructor(private store: Store<State>) {}

  selectedCourseMetrics$: Observable<{
    groups: { course: string; metrics: any }
    general: GroupMetrics
    fromLastWeek: GroupMetrics
  }> = this.store.select('metrics').pipe(
    map(({ courses, selected }) => {
      const metrics = {
        groups: selected.metrics,
        general: courses.general[selected.course],
        fromLastWeek: courses.fromLastWeek[selected.course],
      }
      return metrics
    })
  )

  weeklyInteractions$: Observable<WeeklyInteraction[]> = this.store
    .select('metrics')
    .pipe(
      map(({ selected, groups }) => {
        const weeklyInteractions = {}
        groups.weeklyInteractions
          .filter((interaction: WeeklyInteraction) => {
            if (
              !interaction.registration_id ||
              interaction.registration_id === selected.parentGroup.registration
            ) {
              return interaction
            }
          })
          .forEach((interaction: WeeklyInteraction) => {
            weeklyInteractions[interaction.week] = {
              ...interaction,
              hours:
                get(weeklyInteractions, `${interaction.week}.hours`, 0) +
                interaction.hours,
              minutes:
                get(weeklyInteractions, `${interaction.week}.minutes`, 0) +
                interaction.minutes,
            }
          })

        return toArray(weeklyInteractions)
      })
    )
}
