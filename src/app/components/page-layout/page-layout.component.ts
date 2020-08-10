import { Component, OnInit, Optional, ViewEncapsulation } from '@angular/core'
import { NbMenuItem, NbThemeService } from '@nebular/theme'
import { ImpersonationService } from '@ticmas/auth-service'
import { combineLatest, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ChatService } from 'src/app/chat/chat.service'
import { environment } from '../../../environments/environment'
import { LayoutService } from '../../services/layout.service'
import { ContextService } from './../../services/context.service'

declare class NbMenuItemExtended extends NbMenuItem {
  /**
   * Item Title
   * @type {string}
   */
  id?: string
  /**
   * Item Title
   * @type {string}
   */
  badge?: any
}

@Component({
  selector: 'app-page-layout',
  templateUrl: './page-layout.component.html',
  styleUrls: ['./page-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PageLayoutComponent implements OnInit {
  public logoUrl = environment.skin
    ? '/' + environment.skin + 'Logo.png'
    : '/ticmas-logo-large.svg'
  hasTraining$: Observable<boolean>

  constructor(
    private themeService: NbThemeService,
    public layoutService: LayoutService,
    public chatService: ChatService,
    private contextService: ContextService,
    @Optional() public impersonationService: ImpersonationService
  ) {}

  sidenavItems$: Observable<NbMenuItemExtended[]> = combineLatest(
    this.impersonationService.impersonating$,
    this.contextService.hasHomework$
  ).pipe(
    map(([impersonating, hasHomework]) => {
      return [
        {
          id: 'courses',
          title: 'Clases',
          link: '/clases',
          icon: 'home-outline',
        },
        {
          id: 'library',
          title: 'Biblioteca',
          link: '/biblioteca',
          icon: 'book-open-outline',
        },
        {
          id: 'calendar',
          title: 'Calendario',
          link: '/calendario',
          icon: 'calendar-outline',
        },
        ...(!impersonating
          ? [
              {
                id: 'chat',
                title: 'Chat',
                link: '/chat',
                icon: 'message-circle-outline',
                badge: this.chatService.haveUnreadMessages$,
                badgeValue: this.chatService.countUnreadMessages$,
              },
            ]
          : []),
        ...(hasHomework
          ? [
              {
                id: 'homework',
                title: 'Crear tarea',
                link: '/crear-tarea',
                icon: 'file-add-outline',
              },
            ]
          : []),
        // TODO
        // {
        //   title: 'Subir contenido propio',
        //   link: '/subir-contenido',
        //   icon: 'attach-2-outline',
        // },
      ]
    })
  )

  ngOnInit() {
    this.themeService.changeTheme(environment.theme || 'default')
    this.hasTraining$ = this.contextService.hasTraining$
  }
}
