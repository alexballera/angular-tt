import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NbCardModule } from '@nebular/theme'
import { FullCalendarModule } from 'primeng/fullcalendar'
import { CalendarPrimeComponent } from './calendar-prime.component'

@NgModule({
  imports: [CommonModule, FullCalendarModule, NbCardModule],
  declarations: [CalendarPrimeComponent],
  exports: [CalendarPrimeComponent],
})
export class CalendarPrimeModule {}
