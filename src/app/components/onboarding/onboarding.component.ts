import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss'],
})
export class OnboardingComponent {
  @Input() icon: string
  @Input() message: string
  @Input() notShowAgain: boolean
  @Output() close = new EventEmitter<any>()

  closeOnboarding(val) {
    this.close.emit(val)
  }
}
