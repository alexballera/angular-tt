import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'
import { NbButtonModule, NbIconModule, NbInputModule } from '@nebular/theme'
import { AuthGuard } from '@ticmas/auth-service'
import { AppSelectorModule } from '../components/app-selector/app-selector.module'
import { LayoutModule } from '../components/layout/layout.module'
import { TrainingButtonModule } from '../components/training-button/training-button.module'
import { ImpersonationSelectorModule } from '../shared/impersonation-selector/impersonation-selector.module'
import { AbpGuard } from './abp.guard'
import { HomeComponent } from './home/home.component'
import { PageLayoutComponent } from './page-layout/page-layout.component'

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: HomeComponent, canActivate: [AbpGuard] }],
  },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    LayoutModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    ImpersonationSelectorModule,
    AppSelectorModule,
    TrainingButtonModule,
  ],
  exports: [RouterModule],
  declarations: [PageLayoutComponent],
})
export class AbpRoutingModule {}
