import { Component, OnInit } from '@angular/core'
import { ImpersonationService } from '@ticmas/auth-service'

@Component({
  selector: 'app-tutor-teachers-page',
  templateUrl: './tutor-teachers-page.component.html',
  styleUrls: ['./tutor-teachers-page.component.scss'],
})
export class TutorTeachersPageComponent implements OnInit {
  constructor(private impersonationService: ImpersonationService) {}

  ngOnInit() {
    this.impersonationService.fetchImpersonationTargets()
  }
}
