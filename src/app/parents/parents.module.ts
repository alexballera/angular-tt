import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbPopoverModule,
  NbProgressBarModule,
  NbSelectModule,
  NbSpinnerModule,
  NbUserModule,
} from '@nebular/theme'
import { EffectsModule } from '@ngrx/effects'
import { ImpersonationModule } from '@ticmas/auth-service'
import { ContentsService } from '../services/contents.service'
import { MetricsModule } from '../services/metrics/metrics.module'
import { PipesModule } from '../shared/pipes/pipes.module'
import { HomeComponent } from './home/home.component'
import { ParentsEffects } from './ngrx/effects'
import { NgRxModule } from './ngrx/ngrx.module'
import { ParentsRoutingModule } from './parents-routing.module'
import { ParentsMetricsService } from './services/metrics.service'
import { ParentsService } from './services/parents.service'

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbUserModule,
    NbPopoverModule,
    NbBadgeModule,
    NbSelectModule,
    NbContextMenuModule,
    NbSpinnerModule,
    NbProgressBarModule,
    ParentsRoutingModule,
    ImpersonationModule,
    MetricsModule,
    PipesModule,
    NgRxModule,
  ],
  declarations: [HomeComponent],
  entryComponents: [],
  providers: [ParentsService, ParentsMetricsService, ContentsService],
})
export class ParentsModule {}
