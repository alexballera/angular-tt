import { Injectable } from '@angular/core'
import { WeeklyInteraction } from '@ticmas/common-interfaces'
import format from 'date-fns/format'
import parseISO from 'date-fns/parseISO'
import floor from 'lodash/floor'
import round from 'lodash/round'
import sumBy from 'lodash/sumBy'

@Injectable({
  providedIn: 'root',
})
export class GlobalMetricsService {
  getAvgInteractionTime(hours, minutes, divider) {
    const totalHours = hours + minutes / 60

    const avgTotalHours = totalHours / divider || 0
    const avgTotalMinutes = (avgTotalHours - floor(avgTotalHours)) * 60

    return {
      hours: round(avgTotalHours),
      minutes: round(avgTotalMinutes),
    }
  }

  getAvgWeeklyInteractions(weeklyStudentInteractions: WeeklyInteraction[]) {
    const totalWeeks = weeklyStudentInteractions.length
    const hours = sumBy(
      weeklyStudentInteractions,
      interactions => interactions.hours
    )
    const minutes = sumBy(
      weeklyStudentInteractions,
      interactions => interactions.minutes
    )

    return this.getAvgInteractionTime(hours, minutes, totalWeeks)
  }

  weeklyChartData(weeklyInteractions: WeeklyInteraction[]) {
    return weeklyInteractions.map(interaction => {
      const date = interaction.start_date.split('T')[0]
      return {
        valueY: interaction.hours,
        valueX: format(parseISO(date), 'd/M'),
      }
    })
  }
}
