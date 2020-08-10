import { Component, Inject, Input, OnInit } from '@angular/core'
import { NbDialogRef, NbDialogService, NbIconLibraries } from '@nebular/theme'
import { AuthService } from '@ticmas/auth-service'
import get from 'lodash/fp/get'
import { BehaviorSubject, combineLatest } from 'rxjs'
import { map } from 'rxjs/operators'
import { LayoutService } from '../layout/layout.service'
import { ChangeEmailComponent } from './change-email-component/change-email.component'
import { ChangePasswordComponent } from './change-password-component/change-password.component'
import { InstructionsDialogComponent } from './instructions-dialog/instructions-dialog.component'
import { ProfileService } from './profile.service'

@Component({
  selector: 'ticmas-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  @Input() defaultAvatar = 'https://bulma.io/images/placeholders/256x256.png'
  imgError$ = new BehaviorSubject(false)

  tempAvatar: string
  errorMsg: string
  isUploading = false

  passwordFormOpen$ = this.service.formVisible$
  displayAvatar$

  constructor(
    public service: ProfileService,
    public auth: AuthService,
    private dialogService: NbDialogService,
    public sidebar: LayoutService,
    @Inject('ENV') public environment
  ) {}

  avatarChange(event: Event) {
    this.errorMsg = null
    this.imgError$.next(false)
    const file = get(['files', '0'], event.target)

    if (!file) {
      return
    }

    const error = this.service.checkAvatarFileErrors(file)

    if (error) {
      this.imgError$.next(true)
      this.errorMsg = error
      return
    }

    const reader = new FileReader()
    reader.onload = ({ target }: ProgressEvent) => {
      this.tempAvatar = (target as FileReader).result.toString()
    }
    reader.onerror = ({}: ProgressEvent) => {
      this.imgError$.next(true)
    }

    this.service.changeAvatar(file, reader)
  }

  showPasswordForm() {
    this.sidebar.openSidebar(ChangePasswordComponent)
  }

  showEmailForm() {
    this.sidebar.openSidebar(ChangeEmailComponent)
  }

  logOut() {
    this.auth.logout(window.location.origin)
  }

  openInstructions() {
    // TODO: TP-1904 Reactivar dialog de instrucciones cuando este disponible

    // this.dialogService.open(InstructionsDialogComponent, {
    //   dialogClass: 'dialog',
    //   closeOnBackdropClick: true
    // })

    window.open(
      'https://vi-datec.atlassian.net/servicedesk/customer/portal/4',
      '_blank'
    )
  }

  ngOnInit() {
    this.displayAvatar$ = combineLatest(
      this.auth.userInfo$,
      this.imgError$.asObservable()
    ).pipe(
      map(([userinfo, imgError]) => {
        if (imgError) {
          return this.defaultAvatar
        }
        return this.tempAvatar || userinfo.picture || this.defaultAvatar
      })
    )
  }

  faq() {
    window.open(
      'https://' +
        this.environment.s3.cdn.bucket +
        '/public/preguntas_frecuentes.pdf',
      '_blank'
    )
  }
}
