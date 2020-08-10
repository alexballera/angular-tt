import { DOCUMENT } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { AuthService } from '@ticmas/auth-service'
import { combineLatest } from 'rxjs'
import { filter, withLatestFrom } from 'rxjs/operators'
import { environment } from '../environments/environment'
import { ClassroomIntegrationActions } from './actions'

declare let gtag: (...args: any[]) => void

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public auth: AuthService,
    private router: Router,
    private store: Store<any>,
    @Inject(DOCUMENT) private document: HTMLDocument
  ) {
    this.setIntegrationFavicon()
  }
  ngOnInit() {
    this.router.events
      .pipe(
        filter<NavigationEnd>(e => e instanceof NavigationEnd),
        withLatestFrom(this.auth.userInfo$),
        filter(([, user]) => Boolean(user))
      )
      .subscribe(([event, { sub }]) => {
        const { gTagIds = [] } = environment
        gTagIds.forEach(id => {
          gtag('config', id, {
            page_path: event.urlAfterRedirects,
            user_id: sub,
          })
        })
      })

    combineLatest(this.auth.loggedIn$, this.auth.userInfo$)
      .pipe(filter(([, user]) => Boolean(user)))
      .subscribe(([, user]) => {
        if (user.google) {
          this.store.dispatch(
            ClassroomIntegrationActions.syncClassroomCourses()
          )
        }
      })
  }

  setIntegrationFavicon() {
    const faviconSizes = ['16x16', '32x32', '96x96']
    if (environment.skin) {
      faviconSizes.forEach(size => {
        this.document
          .getElementById(`appFavicon${size}`)
          .setAttribute('href', `/${environment.skin}Favicon-${size}.png`)
      })
    }
  }
}
