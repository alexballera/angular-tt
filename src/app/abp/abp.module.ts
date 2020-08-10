import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SafeIframeModule } from '../shared/safe-iframe/safe-iframe.module'
import { AbpRoutingModule } from './abp-routing.module'
import { AbpGuard } from './abp.guard'
import { AbpService } from './abp.service'
import { HomeComponent } from './home/home.component'

@NgModule({
  imports: [CommonModule, SafeIframeModule, AbpRoutingModule],
  declarations: [HomeComponent],
  providers: [AbpGuard, AbpService],
})
export class AbpModule {}
