import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NbSelectModule } from '@nebular/theme'
import { AuthGuard } from '@ticmas/auth-service'
import { AppSelectorModule } from '../components/app-selector/app-selector.module'
import { LayoutModule } from '../components/layout/layout.module'
import { TrainingButtonModule } from '../components/training-button/training-button.module'
import { ImpersonationSelectorModule } from '../shared/impersonation-selector/impersonation-selector.module'
import { GeneralGuideComponent } from './general-guide/general-guide.component'
import { HbHomeComponent } from './home/hb-home.component'
import { HbLayoutComponent } from './page-layout/hb-layout.component'
import { SkillDetailComponent } from './skill-detail/skill-detail.component'
import { SoftSkillsService } from './soft-skills.service'

const necessaryRoles = {
  roles: ['director', 'teacher'],
}

export const routes: Routes = [
  {
    path: '',
    component: HbLayoutComponent,
    resolve: [SoftSkillsService],
    children: [
      {
        path: '',
        component: HbHomeComponent,
        canActivate: [AuthGuard],
        data: { ...necessaryRoles },
      },
      {
        path: 'habilidad',
        component: SkillDetailComponent,
        canActivate: [AuthGuard],
        data: { ...necessaryRoles },
      },
      {
        path: 'manual-de-uso',
        component: GeneralGuideComponent,
        canActivate: [AuthGuard],
        data: { ...necessaryRoles },
      },
    ],
  },
]

@NgModule({
  imports: [
    CommonModule,
    NbSelectModule,
    RouterModule.forChild(routes),
    LayoutModule,
    ImpersonationSelectorModule,
    AppSelectorModule,
    TrainingButtonModule,
  ],
  providers: [],
  declarations: [HbLayoutComponent],
  exports: [RouterModule],
})
export class HbRoutingModule {}
