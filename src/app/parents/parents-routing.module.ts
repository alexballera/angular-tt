import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
} from '@nebular/theme'
import { AuthGuard } from '@ticmas/auth-service'
import { LayoutService } from '../components/layout/layout.module'
import { HomeComponent } from './home/home.component'
import { ParentsLayoutComponent } from './page-layout/parents-layout.component'

const necessaryRoles = {
  roles: ['parent'],
}

export const routes: Routes = [
  {
    path: '',
    component: ParentsLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [AuthGuard],
        data: { ...necessaryRoles },
      },
    ],
  },
]

@NgModule({
  imports: [
    CommonModule,
    NbLayoutModule,
    NbIconModule,
    NbContextMenuModule,
    RouterModule.forChild(routes),
  ],
  providers: [LayoutService],
  declarations: [ParentsLayoutComponent],
  exports: [RouterModule],
})
export class ParentsRoutingModule {}
