import { Inject, Injectable, InjectionToken } from '@angular/core'
import { Action, ActionReducerMap, Store } from '@ngrx/store'
import { AuthService } from '@ticmas/auth-service'
import { S3Environment, S3UploadService } from '@ticmas/common-services'
import set from 'lodash/fp/set'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import {
  avatarChange,
  passwordChange,
  showPasswordForm,
  togglePasswordForm,
  updateUser,
} from './ngrx/actions'
import { State } from './ngrx/reducers'

@Injectable()
export class ProfileService {
  static featureName = '@ticmas/common-components Profile'

  static injectionToken = new InjectionToken<ActionReducerMap<State, Action>>(
    ProfileService.featureName
  )

  static validFormats = ['jpeg', 'jpg', 'png']

  state$: Observable<State> = this.store.select(ProfileService.featureName)

  formVisible$: Observable<State['passwordFormVisible']> = this.store.select(
    ProfileService.featureName,
    'passwordFormVisible'
  )

  constructor(
    private store: Store<any>,
    private auth: AuthService,
    @Inject('ENV') private environment: S3Environment,
    private uploadService: S3UploadService
  ) {}

  passwordUpdateSucceeded$: Observable<boolean> = this.store
    .select(ProfileService.featureName, 'passwordChangeSuccess')
    .pipe(map(({ success }) => success))

  passwordUpdateFailed$: Observable<boolean> = this.store
    .select(ProfileService.featureName, 'passwordChangeSuccess')
    .pipe(map(({ error }) => error))

  changePassword(password: string) {
    this.store.dispatch(passwordChange.request(password))
  }

  changeEmail(email: string) {
    const { sub, preferred_username, ...userInfo } = this.auth.getUserInfo()
    this.store.dispatch(updateUser.request(set('email', email, userInfo)))
  }

  changeAvatar(file: File, reader?: FileReader) {
    const { sub, preferred_username, ...userInfo } = this.auth.getUserInfo()

    const filename = [
      preferred_username,
      Date.now(),
      file.type.split('/').pop(),
    ].join('.')

    const key = `${this.environment.s3.avatars.base}/${filename}`

    this.uploadService
      .upload(file, this.environment.s3.avatars.bucket, key)
      .subscribe({
        next: ({ Key }) => {
          if (reader) {
            reader.readAsDataURL(file)
          }
          this.store.dispatch(avatarChange.success())
          this.store.dispatch(
            updateUser.request(
              set(
                'picture',
                `https://${this.environment.s3.avatars.bucket}/${Key}`,
                userInfo
              )
            )
          )
        },
        error: e => this.store.dispatch(avatarChange.failure(e)),
      })
  }

  showPasswordForm(payload: boolean) {
    this.store.dispatch(showPasswordForm(payload))
  }

  togglePasswordForm() {
    this.store.dispatch(togglePasswordForm())
  }

  checkAvatarFileErrors(file: File) {
    const limitSize = file.size / 1024 / 1024
    if (limitSize >= 2) {
      return 'no puede superar 2MB'
    }

    const fileExtension = file.type.split('/').pop()
    if (!ProfileService.validFormats.includes(fileExtension)) {
      return (
        'Formato inválido: sólo se aceptan archivos de tipo: ' +
        ProfileService.validFormats.join(', ')
      )
    }
  }
}
