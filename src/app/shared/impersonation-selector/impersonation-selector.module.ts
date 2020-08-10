import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NbButtonModule } from '@nebular/theme'
import { ImpersonationSelectorComponent } from './impersonation-selector.component'

@NgModule({
  imports: [CommonModule, NbButtonModule],
  declarations: [ImpersonationSelectorComponent],
  exports: [ImpersonationSelectorComponent],
})
export class ImpersonationSelectorModule {}
