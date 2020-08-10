import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { DistributionGroupActions } from '../../../actions'
import { Environment } from '../../../models'
import { State } from '../../../reducers'
import { DistributionGroupService } from '../../../services/distribution-group.service'

@Component({
  selector: 'app-attach-content',
  templateUrl: './attach-content.component.html',
  styleUrls: ['./attach-content.component.scss'],
})
export class AttachContentComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<boolean>()
  formAttach: FormGroup
  active: number
  disabled = false
  validateGPCDocumentPublic: boolean
  coverPreview: any
  coverPreviewStyles = false
  attachdoc: any
  msgUrl = ''
  domainValid =
    '(?:(?:https:\\/.|))(?:(?:www.|))(?:(youtube|genial|google|docs)\\.(com|ly)\\/\\S*(?:(?:\\/e(?:mbed))?\\/|es|watch\\?(?:\\S*?&?v\\=))|youtu\\.be\\/)([a-zA-Z0-9_-]{6,11})'
  attachOptions = [
    {
      img: 'img/attach-2-outline.svg',
      text: 'Selecciona un archivo de tu ordenador',
      info: 'Max 20mb',
      fileShow: true,
    },
    // {
    //   img: 'img/drive.png',
    //   text: 'Insertar un documento de Drive',
    //   fileShow: false,
    //   validateGPCDocumentPublic: true,
    // },
    {
      img: 'img/youtube.png',
      text: 'Insertar un link de YouTube',
      fileShow: false,
    },
    {
      img: 'img/genially.png',
      text: 'Insertar un link de Genially',
      fileShow: false,
    },
  ]
  attachCoverLoading$: Observable<boolean>

  constructor(
    private fb: FormBuilder,
    private store: Store<State>,
    private http: HttpClient,
    public distributionG: DistributionGroupService,
    @Inject('ENV') private environment: Environment
  ) {}

  ngOnInit() {
    this.formAttach = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.maxLength(150)]],
      url: ['', [Validators.required]],
      cover_url: ['', [Validators.required]],
    })

    this.attachCoverLoading$ = this.distributionG.attachCoverLoading$
  }

  get title() {
    return this.formAttach.get('title')
  }

  get description() {
    return this.formAttach.get('description')
  }

  get url() {
    return this.formAttach.get('url')
  }

  get cover_url() {
    return this.formAttach.get('cover_url')
  }

  submit() {
    if (this.formAttach.invalid) {
      return
    }
    this.msgUrl = ''
    if (this.active !== 0) {
      if (!this.url.value.match(this.domainValid)) {
        this.msgUrl = 'La url no es permitida'
        return
      }
      this.store.dispatch(
        DistributionGroupActions.uploadFileAttachContentSuccess(this.url.value)
      )
    }
    this.store.dispatch(
      DistributionGroupActions.addAttachContent(this.formAttach.value)
    )
    this.store.dispatch(DistributionGroupActions.resetFileAttachContent())
    this.formAttach.reset()
    this.close()
    this.closeDialog.emit(true)
  }

  close() {
    this.closeDialog.emit(true)
  }

  deleteUrl(url) {
    this.store.dispatch(DistributionGroupActions.removeAttachContent(url))
  }

  onPreviewFileInputChange(fileA: File) {
    const reader = new FileReader()
    this.coverPreviewStyles = true
    reader.onload = e => {
      this.coverPreview = reader.result
    }
    reader.readAsDataURL(fileA)
    this.cover_url.setValue(fileA.name)
    this.store.dispatch(
      DistributionGroupActions.uploadCoverAttachContent({
        id: fileA.name,
        file: fileA,
      })
    )
  }

  onFileInputChange(fileA: File) {
    this.attachdoc = fileA.name
    this.url.setValue(fileA.name)
    this.store.dispatch(
      DistributionGroupActions.uploadFileAttachContent({
        id: fileA.name,
        file: fileA,
      })
    )
  }

  deleteAttachDoc() {
    this.attachdoc = ''
    this.url.setValue('')
  }

  changeOption(i, item) {
    this.active = i
    this.validateGPCDocumentPublic = item.validateGPCDocumentPublic
      ? true
      : false
    if (i !== 0) {
      this.url.setValue('')
    }
  }

  onFileError(e) {
    const err = e
  }

  validateLink() {
    if (this.validateGPCDocumentPublic) {
      const url =
        'https://content.googleapis.com/drive/v2/files/' +
        this.url.value.split('/')[5] +
        '?key=' +
        this.environment.gcpapikey
      this.http.get(url).subscribe(
        res => {
          this.formAttach.controls.url.setErrors(null)
        },
        err => {
          this.formAttach.controls.url.setErrors({ incorrect: true })
        }
      )
    }
  }
}
