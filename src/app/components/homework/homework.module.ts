import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbSelectModule,
  NbSpinnerModule,
} from '@nebular/theme'
import { SwiperModule } from 'ngx-swiper-wrapper'
import { FullNamePipe } from 'src/app/shared/pipes/full-name.pipe'
import { PipesModule } from 'src/app/shared/pipes/pipes.module'
import { FileModule } from '../../shared/file/file.module'
import { DateSelectorModule } from '../common/date-selector/date-selector.module'
import { GroupSelectorModule } from '../common/group-selector/group-selector.module'
import { ArrayPluckFieldPipe } from './array-pluck-field.pipe'
import { HomeworkDetailComponent } from './detail/detail.component'
import { FindFullNameByIdPipe } from './find-fullname-by-id.pipe'
import { HomeworkComponent } from './homework.component'
import { HomeworkService } from './homework.service'
import { HomeworkListComponent } from './list/list.component'
import { OrderByDatePipe } from './order-by-date.pipe'
import { OrderBySubmissionDatePipe } from './order-by-submission-date.pipe'
import { HomeworkPlaceholderComponent } from './placeholder/placeholder.component'
import { HomeworkAssignmentComponent } from './review/assignment/assignment.component'
import { HomeworkCommentsComponent } from './review/comments/comments.component'
import { ConfirmCommentComponent } from './review/comments/confirm-comment/comment-comfirm.component'
import { InstructionsComponent } from './review/instructions/instructions.component'
import { HomeworkReviewComponent } from './review/review.component'
import { SafePipe } from './safe.pipe'
import { StudentSelectorComponent } from './student-selector/student-selector.component'
import { HomeworkUploadFileModule } from './upload-file/upload-file.module'

@NgModule({
  imports: [
    CommonModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbInputModule,
    NbSelectModule,
    FormsModule,
    NbCardModule,
    NbBadgeModule,
    ReactiveFormsModule,
    GroupSelectorModule,
    DateSelectorModule,
    PipesModule,
    SwiperModule,
    NbSpinnerModule,
    FileModule,
    HomeworkUploadFileModule,
  ],
  declarations: [
    HomeworkCommentsComponent,
    HomeworkComponent,
    HomeworkListComponent,
    HomeworkDetailComponent,
    HomeworkPlaceholderComponent,
    HomeworkReviewComponent,
    HomeworkAssignmentComponent,
    StudentSelectorComponent,
    InstructionsComponent,
    OrderByDatePipe,
    OrderBySubmissionDatePipe,
    ConfirmCommentComponent,
    ArrayPluckFieldPipe,
    FindFullNameByIdPipe,
    SafePipe,
  ],
  exports: [HomeworkComponent],
  entryComponents: [InstructionsComponent, ConfirmCommentComponent],
  providers: [HomeworkService, FullNamePipe],
})
export class HomeworkModule {}
