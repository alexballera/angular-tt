import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@ticmas/auth-service'
import { CreateHomeworkPageComponent } from './create-homework-page.component'

const necessaryRoles = {
  roles: ['teacher'],
}

export const routes: Routes = [
  {
    path: '',
    component: CreateHomeworkPageComponent,
    canActivate: [AuthGuard],
    data: { ...necessaryRoles },
  },
]

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  providers: [],
  declarations: [],
  exports: [RouterModule],
})
export class CreateHomeworkPagePageRoutingModule {}
