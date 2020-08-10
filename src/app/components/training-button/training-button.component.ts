import { Component, Inject } from '@angular/core'
import { AuthService } from '@ticmas/auth-service'

@Component({
  selector: 'app-training-button',
  templateUrl: 'training-button.component.html',
  styleUrls: ['training-button.component.scss'],
})
export class TrainingButtonComponent {
  constructor(
    @Inject('ENV') private environment,
    private authService: AuthService
  ) {}

  goToTicmasTraining() {
    this.authService.accessToken$.subscribe(token => {
      const url = `${this.environment.domains.scl}/tabs/feed?access_token=${token}`
      window.open(url, '_blank')
    })
  }
}
