import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@ticmas/auth-service'
import { ContactPageComponent } from './contact-page.component'

const necessaryRoles = {
  roles: ['director', 'teacher'],
}

export const routes: Routes = [
  {
    path: '',
    component: ContactPageComponent,
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
export class ContactPageRoutingModule {}
