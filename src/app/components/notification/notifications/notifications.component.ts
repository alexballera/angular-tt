import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core'
import { Store } from '@ngrx/store'
import { format } from 'date-fns'
import { Observable } from 'rxjs'
import { map, tap } from 'rxjs/operators'
import { Notification } from '../../models'
import { ReadNotifications } from '../ngrx/actions'
import { State } from '../ngrx/reducers'
import { NotificationService } from '../notification.service'

@Component({
  selector: 'ticmas-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnChanges {
  @Input() reading = false
  @Input() format = 'DD/MM/YY H:mm'

  notifications$: Observable<Notification[]>

  constructor(
    private notificationService: NotificationService,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.notifications$ = this.notificationService.list$.pipe(
      tap(() => this.readIfReading()),
      map(([...notifications]) =>
        notifications
          .reverse()
          .filter(notification => notification.persistent)
          .map(notification => ({
            ...notification,
            formattedDate: format(
              new Date(notification.timestamp),
              this.format
            ),
          }))
      )
    )
  }

  ngOnChanges(changes: SimpleChanges) {
    this.readIfReading()
  }

  readIfReading() {
    if (this.reading) {
      this.store.dispatch(new ReadNotifications())
    }
  }
}
