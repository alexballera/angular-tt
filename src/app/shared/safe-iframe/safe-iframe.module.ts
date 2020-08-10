import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SafeIframeComponent } from './safe-iframe/safe-iframe.component'

@NgModule({
  imports: [CommonModule],
  declarations: [SafeIframeComponent],
  exports: [SafeIframeComponent],
})
export class SafeIframeModule {}
