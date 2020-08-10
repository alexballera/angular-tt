import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ToastService } from '@ticmas/common-services'

@Component({
  selector: 'content-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class ContentUploadFileComponent {
  @Input() title = ''
  @Input() src = ''
  @Input() subtitle = ''
  @Input() hasUploadBox: false
  @Input() coverPreviewStyles
  @Input() progress
  @Input() allowedMimes: string[] = ['*/*']
  @Input() maxSize
  @Output() fileChange = new EventEmitter<File>()
  @Output() error = new EventEmitter<File>()

  constructor(private toast: ToastService) {}

  onChange(files: FileList) {
    const file = files.item(0)

    if (file && this.validSize(file) && this.validType(file)) {
      this.fileChange.emit(file)
    } else {
      if (file && !this.validSize(file)) {
        this.toast.showToast(
          `El tamaño permitido no debe superar ${this.maxSize / 1024 / 1024}Mb`,
          null,
          {
            status: 'danger',
          }
        )
      } else if (file && !this.validType(file)) {
        this.toast.showToast(`La extensión del archivo no es permitida`, null, {
          status: 'danger',
        })
      }
      this.error.emit(file)
    }
  }

  validSize(file: File) {
    const [fileType] = file.type.split('/')
    if (fileType === 'image' || fileType === 'video') {
      this.maxSize = 150 * 1024 * 1024
    }
    return file.size <= this.maxSize
  }

  validType(file: File) {
    const [fileType, fileSubtype] = file.type.split('/')
    return this.allowedMimes.some(mime => {
      const [mimeType, mimeSubtype] = mime.split('/')
      return (
        (mimeType === '*' || mimeType === fileType) &&
        (mimeSubtype === '*' || mimeSubtype === fileSubtype)
      )
    })
  }
}
