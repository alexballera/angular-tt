import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbPopoverModule,
} from '@nebular/theme'
import { NgCircleProgressModule } from 'ng-circle-progress'
import { OverlayPanelModule } from 'primeng/overlaypanel'
import { SharedModule } from '../../shared.module'
import { PipesModule } from '../../shared/pipes/pipes.module'
import { ChartsModule } from '../charts/charts.module'
import { ContentModule } from '../contents/contents.module'
import { StudentGeneralProgressComponent } from './general-progress/general-progress.component'
import { StudentListComponent } from './list/list.component'
import { MetricCardComponent } from './metric-card/metric-card.component'
import { StudentNotesComponent } from './notes/notes.component'
import { StudentOptionsComponent } from './options/options.component'
import { StudentPassResetComponent } from './pass-reset/pass-reset.component'
import { StudentComponent } from './student.component'

@NgModule({
  imports: [
    CommonModule,
    OverlayPanelModule,
    FormsModule,
    NbEvaIconsModule,
    NbIconModule,
    NbContextMenuModule,
    NbPopoverModule,
    NbCardModule,
    NbButtonModule,
    SharedModule,
    ContentModule,
    ChartsModule,
    PipesModule,
    NgCircleProgressModule.forRoot(),
    PipesModule,
  ],
  declarations: [
    StudentComponent,
    StudentNotesComponent,
    StudentOptionsComponent,
    StudentPassResetComponent,
    StudentListComponent,
    StudentGeneralProgressComponent,
    MetricCardComponent,
  ],
  exports: [StudentComponent],
  entryComponents: [StudentPassResetComponent],
})
export class StudentModule {}
