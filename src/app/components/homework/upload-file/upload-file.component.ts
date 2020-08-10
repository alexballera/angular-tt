import { Component, EventEmitter, Input, Output } from '@angular/core'
import { ToastService } from '@ticmas/common-services'

@Component({
  selector: 'homework-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class HomeworkUploadFileComponent {
  @Input() title = ''
  @Input() src
  @Input() subtitle = ''
  @Input() allowedMimes: string[] = ['*/*']
  @Input() mimesMaxSize: Array<{ mime: string; maxSize: number }>
  @Input() maxSizeDoc: number
  @Input() maxSizeMedia: number
  @Output() fileChange = new EventEmitter<File>()
  @Output() error = new EventEmitter<File>()
  @Output() click = new EventEmitter<void>()

  attachImg = 'img/attachment-2-outline.svg'

  maxSize: number
  mega = 1000000

  constructor(private toast: ToastService) {}

  onChange(files: FileList) {
    const file = files.item(0)
    const [fileType, fileSubtype] = file.type.split('/')

    if (file && this.validSize(file) && this.validType(file)) {
      this.fileChange.emit(file)
    } else {
      if (file && !this.validSize(file)) {
        this.toast.showToast(
          `El tamaño permitido no debe superar ${this.maxSize / this.mega} Mb`,
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

  clearValue(event) {
    event.target.value = ''
    this.click.emit()
  }

  findMimeMaxSize(file: File): number {
    const [fileType, fileSubtype] = file.type.split('/')
    const mimeMatch = this.mimesMaxSize.find(item => {
      const [itemType, itemSubtype] = item.mime.split('/')
      if (
        itemType === '*' ||
        (itemType === fileType &&
          (itemSubtype === fileSubtype || itemSubtype === '*'))
      ) {
        return item
      }
    })
    return mimeMatch.maxSize
  }

  validSize(file: File) {
    this.maxSize = this.findMimeMaxSize(file)
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
