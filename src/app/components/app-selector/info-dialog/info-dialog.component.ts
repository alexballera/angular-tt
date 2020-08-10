import { Component, Input } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'app-info-dialog',
  templateUrl: './info-dialog.component.html',
  styleUrls: ['./info-dialog.component.scss'],
})
export class InfoDialogComponent {
  @Input() type: string

  constructor(protected dialogRef: NbDialogRef<InfoDialogComponent>) {}

  close() {
    this.dialogRef.close()
  }
}
