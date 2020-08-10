import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NbPopoverModule } from '@nebular/theme'
import { ChatService } from '@ticmas/chat'
import { ToastModule } from '@ticmas/common-services'
import {
  OWL_DATE_TIME_LOCALE,
  OwlDateTimeIntl,
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from 'ng-pick-datetime'
import { NgrxFormsModule } from 'ngrx-forms'
import { AccordionModule } from 'primeng/accordion'
import { SidebarModule } from 'primeng/sidebar'
import { DateTimeIntl } from '../models/DateTimeIntl'
import { SharedModule } from '../shared.module'
import { ImpersonationSelectorModule } from '../shared/impersonation-selector/impersonation-selector.module'
import { PipesModule } from '../shared/pipes/pipes.module'
import { AppSelectorModule } from './app-selector/app-selector.module'
import { CommonComponentsModule } from './common/common-components.module'
import { DateSelectorModule } from './common/date-selector/date-selector.module'
import { ContentCardComponent } from './content-card/content-card.component'
import { ContentPreviewModule } from './content-preview/content-preview.module'
import { ContentsLibraryModule } from './contents-library/contents-library.module'
import { CreateCourseComponent } from './course/create-course/create-course.component'
import { ScheduleComponent } from './course/schedule/schedule.component'
import { LayoutModule } from './layout/layout.module'
import { ContentPreviewDetailComponent } from './library/content-preview/content-preview.component'
import { ContentPublicatorModule } from './library/content-publicator/content-publicator.module'
import { LibraryComponent } from './library/library.component'
import { StudentAdditionSubgroupComponent } from './modals/student-addition-subgroup/student-addition-subgroup.component'
import { StudentAdditionStepOneComponent } from './modals/student-addition/step-one/step-one.component'
import { StudentAdditionStepThreeComponent } from './modals/student-addition/step-three/step-three.component'
import { StudentAdditionStepTwoComponent } from './modals/student-addition/step-two/step-two.component'
import { StudentAdditionComponent } from './modals/student-addition/student-addition.component'
import { MyClassroomsModule } from './my-classrooms/my-classrooms.module'
import { NotificationModule } from './notification/notification.module'
import { OnboardingModule } from './onboarding/onboarding.module'
import { PageLayoutComponent } from './page-layout/page-layout.component'
import { ContentPreviewPageComponent } from './pages/content-preview-page/content-preview-page.component'
import { ContentsPageComponent } from './pages/contents-page/contents-page.component'
import { LibraryPageComponent } from './pages/library-page/library-page.component'
import { MyClassroomsPageComponent } from './pages/my-classrooms-page/my-classrooms-page.component'
import { ProfileModule } from './profile/profile.module'
import { StudentModule } from './student/student.module'
import { TrainingButtonModule } from './training-button/training-button.module'
import { WithoutClassesComponent } from './without-classes/without-classes.component'

@NgModule({
  imports: [
    AccordionModule,
    SidebarModule,
    CommonModule,
    RouterModule,
    CommonComponentsModule,
    StudentModule,
    FormsModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ContentsLibraryModule,
    ContentPreviewModule,
    NgrxFormsModule,
    SharedModule,
    LayoutModule,
    ProfileModule,
    NotificationModule,
    ToastModule,
    ContentPublicatorModule,
    ImpersonationSelectorModule,
    AppSelectorModule,
    DateSelectorModule,
    PipesModule,
    MyClassroomsModule,
    NbPopoverModule,
    OnboardingModule,
    TrainingButtonModule,
  ],
  declarations: [
    PageLayoutComponent,
    MyClassroomsPageComponent,
    ContentsPageComponent,
    LibraryComponent,
    LibraryPageComponent,
    StudentAdditionComponent,
    StudentAdditionStepOneComponent,
    StudentAdditionStepTwoComponent,
    StudentAdditionStepThreeComponent,
    StudentAdditionSubgroupComponent,
    ContentCardComponent,
    CreateCourseComponent,
    ContentPreviewDetailComponent,
    ContentPreviewPageComponent,
    ScheduleComponent,
    WithoutClassesComponent,
  ],
  providers: [
    { provide: OWL_DATE_TIME_LOCALE, useValue: 'es' },
    { provide: OwlDateTimeIntl, useClass: DateTimeIntl },
    ChatService,
  ],
  entryComponents: [CreateCourseComponent],
  exports: [],
})
export class ComponentsModule {}
