import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbPopoverModule,
} from '@nebular/theme'
import { OnboardingComponent } from './onboarding.component'

@NgModule({
  imports: [
    CommonModule,
    NbIconModule,
    NbPopoverModule,
    NbCardModule,
    NbButtonModule,
  ],
  exports: [OnboardingComponent],
  declarations: [OnboardingComponent],
  providers: [],
})
export class OnboardingModule {}
