import { NgModule } from '@angular/core'
import { CourseMetricsService } from './course.service'
import { StudentMetricsService } from './student.service'

@NgModule({
  declarations: [],
  providers: [StudentMetricsService, CourseMetricsService],
})
export class MetricsModule {}
