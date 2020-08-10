import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { S3UploadService } from '@ticmas/common-services'
import {
  EomtService,
  ToastService,
  UsersService,
} from '@ticmas/common-services'
import { of } from 'rxjs'
import { catchError, map, pluck } from 'rxjs/operators'
@Component({
  selector: 'app-teachers-registration',
  templateUrl: 'registration.component.html',
  styleUrls: ['registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  showConfirmMessage: boolean = false
  infoForm: FormGroup
  userNameForm: FormGroup
  suggestions: any
  attachements: any[] = []
  uploadingFile: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private s3UploadSrv: S3UploadService,
    private eomtService: EomtService,
    private userService: UsersService,
    private notificationSrv: ToastService,
    @Inject('ENV') private environment
  ) {}

  ngOnInit() {
    this.infoForm = this.formBuilder.group(
      {
        school: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
      },
      {
        asyncValidators: [this.validateEmailNotTaken()],
      }
    )

    this.userNameForm = this.formBuilder.group(
      {
        username: ['', [Validators.required, Validators.minLength(4)]],
      },
      {
        asyncValidators: [this.validateUsernameNotTaken()],
      }
    )
  }

  validateEmailNotTaken() {
    return (input: FormControl) => {
      return this.userService
        .userVerification({
          email: input.value.email,
        })
        .pipe(
          map(() => {
            this.infoForm.controls.email.setErrors(null)
          }),
          catchError(() => {
            this.infoForm.controls.email.setErrors({
              available: true,
            })
            return of('')
          })
        )
    }
  }

  validateUsernameNotTaken() {
    return (input: FormControl) => {
      return this.userService
        .userVerification({
          preferred_username: input.value.username,
        })
        .pipe(
          map(() => {
            this.userNameForm.controls.username.setErrors(null)
          }),
          catchError(() => {
            this.userNameForm.controls.username.setErrors({
              available: true,
            })
            return of('')
          })
        )
    }
  }

  searchSchool(event) {
    this.eomtService
      .getSchools({ q: event.query, limit: 30 })
      .pipe(pluck('data'))
      .subscribe((r: any[]) => {
        this.suggestions = r
      })
  }

  registrationRequest() {
    const infoValues = this.infoForm.value
    const username = this.userNameForm.value.username

    const options = {
      userInfo: {
        email: infoValues.email,
        family_name: infoValues.lastname,
        preferred_username: username,
        given_name: infoValues.firstname,
      },
      attachments: this.attachements.map(a => {
        return { url: a.url }
      }),
    }

    this.eomtService.addTeacher(infoValues.school.id, options as any).subscribe(
      r => {
        this.showConfirmMessage = true
      },
      e => {
        this.notificationSrv.showToast(
          'Error',
          'Hubo un error al enviar la solicitud',
          {
            status: 'error',
          }
        )
      }
    )
  }

  onFileError(err) {
    return err
  }

  onFileInputChange(file: File) {
    if (this.uploadingFile) {
      this.notificationSrv.showToast(
        'Error',
        'Se esta subiendo un archivo espere un momento por favor',
        {
          status: 'error',
        }
      )
      return false
    }
    const timestamp = new Date().getTime()
    const dir = `${this.environment.s3.documentation.base}/${this.infoForm.value.email}/${timestamp}.${file.name}`
    this.uploadingFile = true
    this.s3UploadSrv
      .upload(file, this.environment.s3.documentation.bucket, dir)
      .subscribe((data: any) => {
        this.uploadingFile = false
        this.attachements = this.attachements.concat({
          name: file.name,
          url: 'https://' + data.Bucket + '/' + data.key,
        })
      })
  }

  removeAttachment(index) {
    this.attachements = this.attachements.slice(index, 0)
  }
}
