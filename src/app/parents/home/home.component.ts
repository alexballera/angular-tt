import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import {
  NbContextMenuDirective,
  NbMenuItem,
  NbMenuService,
} from '@nebular/theme'
import { ImpersonationService } from '@ticmas/auth-service'
import { UserInfo } from '@ticmas/common-interfaces'
import has from 'lodash/has'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { SubSink } from 'subsink'
import { ParentsService } from '../services/parents.service'

@Component({
  selector: 'parents-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild(NbContextMenuDirective, { static: true })
  contextMenu: NbContextMenuDirective
  sectionSelected: string

  isLoading$: Observable<boolean>
  courseList$: Observable<any>
  statusCounter$: Observable<any>

  selectedUser$ = this.impersonationService.impersonatedUser$

  menuItems$: Observable<NbMenuItem[]>

  private subs = new SubSink()

  constructor(
    private nbMenuService: NbMenuService,
    public impersonationService: ImpersonationService,
    private parentsService: ParentsService
  ) {}

  ngOnInit() {
    this.isLoading$ = this.parentsService.isLoading$
    this.courseList$ = this.parentsService.courseList$
    this.statusCounter$ = this.parentsService.statusCounter$
    this.sectionSelected = ''

    this.menuItems$ = this.impersonationService.impersonationTargets$.pipe(
      map(users =>
        users.map(user => ({
          title: `${user.given_name} ${user.family_name}`.toUpperCase(),
          data: user,
        }))
      )
    )

    this.impersonationService.fetchImpersonationTargets().then(([first]) => {
      if (first) {
        this.impersonate(first)
      }
    })

    this.subs.add(
      this.nbMenuService
        .onItemClick()
        .pipe(
          filter(({ tag }) => tag === 'impersonate-menu'),
          map(({ item: { data } }) => data)
        )
        .subscribe(data => {
          this.impersonate(data)
        })
    )
  }

  ngOnDestroy() {
    this.subs.unsubscribe()
  }

  impersonate(profile: UserInfo) {
    this.impersonationService.impersonate(profile)
  }
  // FEAT esto pertenece a otra historia
  selectSection(section) {
    // this.sectionSelected = section
  }
}
