import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  ViewChild,
} from '@angular/core'
import { Event, Router, RouterEvent } from '@angular/router'
import { NbMenuItem, NbPopoverDirective } from '@nebular/theme'
import { AuthService } from '@ticmas/auth-service'
import { Subscription } from 'rxjs'
import { filter } from 'rxjs/operators'
import { ContextService } from 'src/app/services/context.service'

@Component({
  selector: 'ticmas-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild(NbPopoverDirective) onboarding: NbPopoverDirective
  @Input() pendings = false

  @Input() logo
  @Input() defaultAvatar

  routerSub: Subscription

  constructor(
    public auth: AuthService,
    @Inject('ENV') private environment,
    private router: Router,
    private contextService: ContextService
  ) {}

  ngOnDestroy() {
    this.routerSub.unsubscribe()
  }

  ngAfterViewInit() {
    this.routerSub = this.contextService.hasOnboarding2$.subscribe(
      hasOnboarding2 => {
        if (hasOnboarding2) {
          if (!this.getOnboardingFlag('help-onboarding')) {
            this.onboarding.show()
          }
        }
      }
    )

    this.routerSub = this.router.events
      .pipe(filter((e: Event): e is RouterEvent => e instanceof RouterEvent))
      .subscribe((e: RouterEvent) => {
        this.closeOnboarding('')
      })
  }

  items: NbMenuItem[] = [
    {
      title: 'Instructivo en video',
      icon: 'play-circle-outline',
      link: '/tutoriales',
    },
    {
      title: 'Instructivo en pdf',
      url: `https://${this.environment.s3.cdn.bucket}/public/Manual+Bienvenida+Instructivo_nuevo_baja.pdf`,
      target: '_blank',
      icon: 'file-text-outline',
    },
    {
      title: 'Preguntas frecuentes',
      url: `https://${this.environment.s3.cdn.bucket}/public/preguntas_frecuentes.pdf`,
      target: '_blank',
      icon: 'question-mark-outline',
    },
    {
      title: 'Contacto',
      icon: 'email-outline',
      link: '/contacto',
    },
  ]

  logOut() {
    this.auth.logout()
  }

  closeOnboarding(val) {
    this.onboarding.hide()
    if (val === 'notShowAgain') {
      this.setOnboardingFlag('help-onboarding')
    }
  }

  setOnboardingFlag(onboarding: string) {
    localStorage.setItem(onboarding, 'opened')
  }

  getOnboardingFlag(onboarding: string) {
    return localStorage.getItem(onboarding)
  }
}
