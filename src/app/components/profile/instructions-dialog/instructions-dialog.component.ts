import { Component, Input } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'app-instructions-dialog',
  templateUrl: './instructions-dialog.component.html',
  styleUrls: ['./instructions-dialog.component.scss'],
})
export class InstructionsDialogComponent {
  url = 'https://vi-datec.atlassian.net/servicedesk/customer/portal/4'
  constructor(protected dialogRef: NbDialogRef<InstructionsDialogComponent>) {}

  close() {
    this.dialogRef.close()
  }
}
