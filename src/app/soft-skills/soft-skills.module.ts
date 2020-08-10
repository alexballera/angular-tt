import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbPopoverModule,
} from '@nebular/theme'
import { SafeIframeModule } from '../shared/safe-iframe/safe-iframe.module'
import { GeneralGuideComponent } from './general-guide/general-guide.component'
import { HbHomeComponent } from './home/hb-home.component'
import { NgRxModule } from './ngrx/ngrx.module'
import { SidebarSkillComponent } from './sidebar-skill/sidebar-skill.component'
import { SkillDetailComponent } from './skill-detail/skill-detail.component'
import { HbRoutingModule } from './soft-skills-routing.module'
import { SoftSkillsService } from './soft-skills.service'

@NgModule({
  imports: [
    CommonModule,
    NbCardModule,
    NbButtonModule,
    HbRoutingModule,
    NbIconModule,
    NbPopoverModule,
    NgRxModule,
    SafeIframeModule,
    NbDialogModule.forRoot(),
  ],
  declarations: [
    HbHomeComponent,
    SkillDetailComponent,
    GeneralGuideComponent,
    SidebarSkillComponent,
  ],
  entryComponents: [SidebarSkillComponent],
  providers: [SoftSkillsService],
})
export class SoftSkillsModule {}
