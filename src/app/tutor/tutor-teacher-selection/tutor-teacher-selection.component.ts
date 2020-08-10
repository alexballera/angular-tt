import { Component } from '@angular/core'
import { ImpersonationService } from '@ticmas/auth-service'
import { UserInfo } from '@ticmas/common-interfaces'

@Component({
  selector: 'app-tutor-teacher-selector',
  templateUrl: './tutor-teacher-selection.component.html',
  styleUrls: ['./tutor-teacher-selection.component.scss'],
})
export class TutorTeacherSelectorComponent {
  defaultAvatar = '/defaultAvatar.svg'
  p: number = 1
  searchText = null

  constructor(public impersonationService: ImpersonationService) {}

  impersonate(user: UserInfo) {
    this.impersonationService.impersonate(user)
  }
}
