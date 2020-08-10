import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NbLayoutModule } from '@nebular/theme'
import { RTLayoutComponent } from './page-layout/layout.component'
import { RegistrationComponent } from './registration/registration.component'

const routes: Routes = [
  {
    path: '',
    component: RTLayoutComponent,
    children: [{ path: '', component: RegistrationComponent }],
  },
]

@NgModule({
  imports: [CommonModule, NbLayoutModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: [RTLayoutComponent],
})
export class TeachersRoutingModule {}
