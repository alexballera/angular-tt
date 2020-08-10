import { NgModule } from '@angular/core'

import { NbButtonModule } from '@nebular/theme'
import { TrainingButtonComponent } from './training-button.component'

@NgModule({
  imports: [NbButtonModule],
  exports: [TrainingButtonComponent],
  declarations: [TrainingButtonComponent],
  providers: [],
})
export class TrainingButtonModule {}
