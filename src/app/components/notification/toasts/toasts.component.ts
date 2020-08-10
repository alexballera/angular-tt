import { Component, Input } from '@angular/core'
import { NotificationService } from '../notification.service'

@Component({
  selector: 'ticmas-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss'],
})
export class ToastsComponent {
  @Input() duration = 3000

  constructor(public notificationService: NotificationService) {}

  remove(toast) {
    this.notificationService.hideToast(toast)
  }
}
