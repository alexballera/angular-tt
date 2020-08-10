import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import { NbIconModule } from '@nebular/theme'
import { SwiperModule } from 'ngx-swiper-wrapper'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { AppSelectorModule } from '../app-selector/app-selector.module'
import { HomeworkModule } from '../homework/homework.module'
import { StudentModule } from '../student/student.module'
import { ChartsModule } from './../charts/charts.module'
import { CommonComponentsModule } from './../common/common-components.module'
import { ContentModule } from './../contents/contents.module'
import { CourseContentComponent } from './course-content/course-content.component'
import { CourseProgressComponent } from './course-progress/course-progress.component'
import { CreateGroupComponent } from './create-group/create-group.component'
import { MyClassroomsComponent } from './my-classrooms.component'

@NgModule({
  imports: [
    CommonModule,
    StudentModule,
    FormsModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    NbIconModule,
    AppSelectorModule,
    CommonComponentsModule,
    ChartsModule,
    PipesModule,
    ContentModule,
    SwiperModule,
    HomeworkModule,
  ],
  declarations: [
    CreateGroupComponent,
    CourseProgressComponent,
    CourseContentComponent,
    MyClassroomsComponent,
  ],
  exports: [MyClassroomsComponent],
  entryComponents: [CreateGroupComponent],
})
export class MyClassroomsModule {}
