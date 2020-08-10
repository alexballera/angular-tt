import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbPopoverModule,
  NbSelectModule,
} from '@nebular/theme'
import { Charts4Module } from '../components/charts4/charts4.module'
import { MonthInteractionComponent } from '../components/common/month-interaction/month-interaction.component'
import { LayoutService } from '../components/layout/layout.module'
import { SharedModule } from '../shared.module'
import { ChartsModule } from './../components/charts/charts.module'
import { ButtonBoxComponent } from './button-box/button-box.component'
import { DirectorRoutingModule } from './director-routing.module'
import { NgRxModule } from './ngrx/ngrx.module'
import { HomeComponent } from './pages/home/home.component'
import { ListingsComponent } from './pages/listings/listings.component'
import { TeacherCardComponent } from './pages/listings/teacher-card/teacher-card.component'
import { AccordionComponent } from './pages/teacher-detail/assigned-content/accordion/accordion.component'
import { AssignedContentComponent } from './pages/teacher-detail/assigned-content/assigned-content.component'
import { ContentDetailComponent } from './pages/teacher-detail/content-detail/content-detail.component'
import { SafePipe } from './pages/teacher-detail/content-detail/safe.pipe'
import { AccordionActionsComponent } from './pages/teacher-detail/latest-actions/accordion-actions/accordion-actions.component'
import { LatestActionsComponent } from './pages/teacher-detail/latest-actions/latest-actions.component'
import { SelectorComponent } from './pages/teacher-detail/selector/selector.component'
import { TeacherDetailComponent } from './pages/teacher-detail/teacher-detail.component'
import { DirectorService } from './services/director.service'
import { DirectorMetricsService } from './services/metrics.service'

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    DirectorRoutingModule,
    NbIconModule,
    NbPopoverModule,
    NgRxModule,
    SharedModule,
    ChartsModule,
    NbSelectModule,
  ],
  declarations: [
    HomeComponent,
    TeacherCardComponent,
    ListingsComponent,
    ButtonBoxComponent,
    ButtonBoxComponent,
    MonthInteractionComponent,
    SelectorComponent,
    TeacherDetailComponent,
    AssignedContentComponent,
    LatestActionsComponent,
    AccordionComponent,
    AccordionActionsComponent,
    ContentDetailComponent,
    SafePipe,
  ],
  entryComponents: [ContentDetailComponent],
  providers: [DirectorMetricsService, DirectorService, LayoutService],
  exports: [Charts4Module],
})
export class DirectorModule {}
