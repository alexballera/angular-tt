import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NbSelectModule } from '@nebular/theme'
import { AuthGuard } from '@ticmas/auth-service'
import { AppSelectorModule } from '../components/app-selector/app-selector.module'
import { LayoutModule } from '../components/layout/layout.module'
import { ImpersonationSelectorModule } from '../shared/impersonation-selector/impersonation-selector.module'
import { LayoutComponent } from './page-layout/layout.component'
import { HomeComponent } from './pages/home/home.component'
import { ListingsComponent } from './pages/listings/listings.component'

const necessaryRoles = {
  roles: ['director'],
}

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { ...necessaryRoles },
      },
      {
        path: 'listing',
        component: ListingsComponent,
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
  ],
  providers: [],
  declarations: [LayoutComponent],
  exports: [RouterModule],
})
export class DirectorRoutingModule {}
