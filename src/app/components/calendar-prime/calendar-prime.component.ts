import { Component, OnInit, ViewChild } from '@angular/core'
import esLocale from '@fullcalendar/core/locales/es'
import dayGridPlugin from '@fullcalendar/daygrid'
import interaction from '@fullcalendar/interaction'
import rrulePlugin from '@fullcalendar/rrule'
import timeGridPlugin from '@fullcalendar/timegrid'
import { addDays, differenceInDays, format, parseISO } from 'date-fns'
import { FullCalendar } from 'primeng/fullcalendar'
import { PlanificationService } from '../../services/planification.service'

@Component({
  selector: 'app-calendar-prime',
  templateUrl: './calendar-prime.component.html',
  styleUrls: ['./calendar-prime.component.scss'],
})
export class CalendarPrimeComponent implements OnInit {
  events: any[]
  options: any
  showDetail = false
  edit = false
  @ViewChild('fc') fc: FullCalendar

  constructor(public planificationService: PlanificationService) {}

  ngOnInit() {
    this.options = {
      firstDay: 1,
      plugins: [dayGridPlugin, timeGridPlugin, interaction, rrulePlugin],
      allDaySlot: false,
      minTime: '07:00:00',
      maxTime: '23:00:00',
      locales: [esLocale],
      locale: 'es',
      defaultView: 'timeGridWeek',
      columnHeaderText(date) {
        switch (date.getUTCDay()) {
          case 0:
            return 'DOM. ' + date.getUTCDate()
          case 1:
            return 'LUN. ' + date.getUTCDate()
          case 2:
            return 'MAR. ' + date.getUTCDate()
          case 3:
            return 'MIÉ. ' + date.getUTCDate()
          case 4:
            return 'JUE. ' + date.getUTCDate()
          case 5:
            return 'VIE. ' + date.getUTCDate()
          case 6:
            return 'SÁB. ' + date.getUTCDate()
        }
      },
      columnHeaderFormat: {
        weekday: 'short',
        day: 'numeric',
      },
      titleFormat: { year: 'numeric', month: 'long' },
      customButtons: {
        showToday: {
          text: 'Ver hoy',
          click: () => this.fc.getCalendar().gotoDate(new Date()),
        },
      },
      header: {
        left: 'prev, title, next',
        right: 'showToday',
      },
      slotLabelFormat: {
        hour12: false,
        hour: 'numeric',
        minute: '2-digit',
        omitZeroMinute: false,
        meridiem: false,
      },
      slotLabelInterval: '01:00',
      eventRender: ({ event, el }) => {
        event.extendedProps.contents.forEach(c => {
          const dd = differenceInDays(
            addDays(parseISO(c.startDate), c.duration),
            event.start
          )
          if (dd >= 0 && dd < c.duration) {
            el.append(c.resource.title)
          }
        })
      },
    }
  }
}
