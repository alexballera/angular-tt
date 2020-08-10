import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NbSelectModule } from '@nebular/theme'
import { AuthGuard } from '@ticmas/auth-service'
import { UploadPageComponent } from './pages/upload/upload-page.component'

const necessaryRoles = {
  roles: ['director', 'teacher'],
}

export const routes: Routes = [
  {
    path: '',
    component: UploadPageComponent,
    canActivate: [AuthGuard],
    data: { ...necessaryRoles },
  },
]

@NgModule({
  imports: [CommonModule, NbSelectModule, RouterModule.forChild(routes)],
  providers: [],
  declarations: [UploadPageComponent],
  exports: [RouterModule],
})
export class UploadContentRoutingModule {}
