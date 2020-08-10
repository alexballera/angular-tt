import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { CalendarPrimeModule } from '../../calendar-prime/calendar-prime.module'
import { CalendarPrimePageRoutingModule } from './calendar-prime-page-routing.module'
import { CalendarPrimePageComponent } from './calendar-prime-page.component'

@NgModule({
  imports: [CommonModule, CalendarPrimeModule, CalendarPrimePageRoutingModule],
  exports: [],
  declarations: [CalendarPrimePageComponent],
  providers: [],
})
export class CalendarPrimePageModule {}
