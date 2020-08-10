import { Component, Input } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'app-comment-comfirm',
  templateUrl: './comment-comfirm.component.html',
  styleUrls: ['./comment-comfirm.component.scss'],
})
export class ConfirmCommentComponent {
  @Input() type: string
  @Input() text: string
  @Input() score: string

  constructor(protected dialogRef: NbDialogRef<any>) {}

  closeDialog() {
    this.dialogRef.close()
  }

  submit() {
    this.dialogRef.close({ text: this.text, score: this.score })
  }
}
