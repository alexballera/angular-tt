import { NgModule } from '@angular/core'
import { CalendarService } from './calendar.service'
import { ContentsService } from './contents.service'
import { ContextService } from './context.service'
import { DistributionGroupService } from './distribution-group.service'
import { IntegrationsService } from './integrations.service'
import { LrsService } from './lrs.service'
import { MetricsModule } from './metrics/metrics.module'
import { PlanificationService } from './planification.service'
import { PreviousRouteService } from './previous-route.service'
import { S3UploadService } from './s3-upload.service'
import { StudentAdditionService } from './student-addition.service'
import { StudentService } from './student.service'

@NgModule({
  imports: [MetricsModule],
  providers: [
    CalendarService,
    ContentsService,
    ContextService,
    DistributionGroupService,
    LrsService,
    PlanificationService,
    PreviousRouteService,
    S3UploadService,
    StudentService,
    StudentAdditionService,
    IntegrationsService,
  ],
  declarations: [],
})
export class ServicesModule {}
