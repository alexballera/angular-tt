import { Inject, Injectable } from '@angular/core'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import { StompService } from '@stomp/ng2-stompjs'
import { AuthService } from '@ticmas/auth-service'
import differenceBy from 'lodash/fp/differenceBy'
import pick from 'lodash/fp/pick'
import { combineLatest, merge, Observable } from 'rxjs'
import { filter, map, switchMap } from 'rxjs/operators'
import { Notification } from '../models'
import { DispatchNotification, HideToast } from './ngrx/actions'
import { State } from './ngrx/reducers'

@Injectable()
export class NotificationService {
  static featureName = '@ticmas/common-components Notification'

  private subscription
  private stomp: StompService

  constructor(
    @Inject('ENV') private environment,
    private auth: AuthService,
    private store: Store<State>
  ) {
    if (this.environment.stomp) {
      this.stomp = new StompService(this.environment.stomp.config)

      const generalTopic = `/topic/${this.environment.stomp.topic}`

      this.subscription = this.auth.userInfo$
        .pipe(
          filter(Boolean),
          switchMap(({ sub }) =>
            merge(
              this.stomp.subscribe(`${generalTopic}`),
              this.stomp.subscribe(`${generalTopic}.${sub}`)
            )
          )
        )
        .subscribe(this.onMessage)
    }
  }

  private state$: Observable<State> = this.store.pipe(
    select(createFeatureSelector(NotificationService.featureName))
  )

  list$: Observable<Notification[]> = this.state$.pipe(select('list'))

  toastsList$: Observable<Notification[]> = combineLatest(
    this.list$,
    this.state$.pipe(select('toastsShown'))
  ).pipe(
    map(([[...list], toastsShown]) =>
      differenceBy('id', list.reverse(), toastsShown)
    )
  )

  unread$: Observable<number> = combineLatest(
    this.list$,
    this.state$.pipe(select('lastRead'))
  ).pipe(
    map(
      ([list, lastRead]) =>
        list.filter(n => n.persistent && n.timestamp > lastRead).length
    )
  )

  onMessage = message => {
    try {
      this.store.dispatch(
        new DispatchNotification({
          persistent: true,
          ...JSON.parse(message.body),
        })
      )
    } catch {
      this.store.dispatch(
        new DispatchNotification({ persistent: true, text: message.body })
      )
    }
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  hideToast(toast: Pick<Notification, 'id'>) {
    this.store.dispatch(new HideToast(pick('id', toast)))
  }
}
