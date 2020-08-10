import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbUserModule,
} from '@nebular/theme'
import { EffectsModule } from '@ngrx/effects'
import { ImpersonationModule } from '@ticmas/auth-service'
import { NgxPaginationModule } from 'ngx-pagination'
import { FilterTeacherPipe } from './filter-teacher.pipe'
import { ImpersonationEffects } from './ngrx/effects'
import { OrderByFamilyName } from './order-by-family-name.pipe'
import { TutorTeacherSelectorComponent } from './tutor-teacher-selection/tutor-teacher-selection.component'
import { TutorTeachersPageComponent } from './tutor-teachers-page/tutor-teachers-page.component'

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    NbCardModule,
    NbListModule,
    NbUserModule,
    ImpersonationModule,
    EffectsModule.forFeature([ImpersonationEffects]),
    NgxPaginationModule,
    FormsModule,
    NbEvaIconsModule,
    NbIconModule,
  ],
  declarations: [
    TutorTeachersPageComponent,
    TutorTeacherSelectorComponent,
    FilterTeacherPipe,
    OrderByFamilyName,
  ],
  exports: [TutorTeachersPageComponent],
})
export class TutorModule {}
