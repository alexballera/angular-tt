import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NbSelectModule } from '@nebular/theme'
import { AuthGuard } from '@ticmas/auth-service'
import { AppSelectorModule } from '../components/app-selector/app-selector.module'
import { LayoutModule, LayoutService } from '../components/layout/layout.module'
import { ImpersonationSelectorModule } from '../shared/impersonation-selector/impersonation-selector.module'
import { CompilerComponent } from './compiler/compiler.component'
import { ForumComponent } from './forum/forum.component'
import { ProgrammingLayoutComponent } from './page-layout/programming-layout.component'

const necessaryRoles = {
  roles: ['teacher'],
}

export const routes: Routes = [
  {
    path: '',
    component: ProgrammingLayoutComponent,
    children: [
      {
        path: '',
        component: ForumComponent,
        canActivate: [AuthGuard],
        data: { ...necessaryRoles },
      },
      {
        path: 'compilador',
        component: CompilerComponent,
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
    AppSelectorModule,
    ImpersonationSelectorModule,
  ],
  providers: [LayoutService],
  declarations: [ProgrammingLayoutComponent],
  exports: [RouterModule],
})
export class ProgrammingRoutingModule {}
