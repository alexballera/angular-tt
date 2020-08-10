import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbTooltipModule,
} from '@nebular/theme'
import { ContactComponent } from './contact.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbCardModule,
    NbTooltipModule,
    NbIconModule,
  ],
  declarations: [ContactComponent],
  exports: [ContactComponent],
})
export class ContactModule {}
