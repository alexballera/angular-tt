import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
  NbDatepickerModule,
  NbIconModule,
  NbSelectModule,
} from '@nebular/theme'
import { DateSelectorComponent } from './date-selector.component'

@NgModule({
  declarations: [DateSelectorComponent],
  imports: [
    CommonModule,
    NbDatepickerModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbSelectModule,
    FormsModule,
  ],
  exports: [DateSelectorComponent],
})
export class DateSelectorModule {}
