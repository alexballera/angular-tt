import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { InteractionsComponent } from './interactions/interactions.component'
import { SubjectsComponent } from './subjects/subjects.component'

@NgModule({
  declarations: [InteractionsComponent, SubjectsComponent],
  imports: [CommonModule],
  exports: [InteractionsComponent, SubjectsComponent],
})
export class Charts4Module {}
