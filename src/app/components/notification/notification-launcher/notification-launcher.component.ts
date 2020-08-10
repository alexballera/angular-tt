import { Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { NotificationService } from '../notification.service'

@Component({
  selector: 'ticmas-notification-launcher',
  templateUrl: './notification-launcher.component.html',
  styleUrls: ['./notification-launcher.component.scss'],
})
export class NotificationLauncherComponent implements OnInit {
  unread$: Observable<number>
  @Input() notificationsPending = false

  constructor(private notifications: NotificationService) {}

  ngOnInit() {
    this.unread$ = this.notifications.unread$
  }
}
