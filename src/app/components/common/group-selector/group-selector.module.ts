import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
  NbDatepickerModule,
  NbIconModule,
  NbSelectModule,
} from '@nebular/theme'
import { GroupSelectorComponent } from './group-selector.component'

@NgModule({
  declarations: [GroupSelectorComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbDatepickerModule.forRoot(),
    NbEvaIconsModule,
    NbIconModule,
    NbSelectModule,
  ],
  exports: [GroupSelectorComponent],
})
export class GroupSelectorModule {}
