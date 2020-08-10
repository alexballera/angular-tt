import { Injectable } from '@angular/core'
import { NbDialogRef, NbDialogService } from '@nebular/theme'

@Injectable()
export class LayoutService {
  private ref: NbDialogRef<any>
  constructor(private dialogService: NbDialogService) {}

  openSidebar(template, options = {}) {
    this.closeSidebar()
    this.ref = this.dialogService.open(template, {
      dialogClass: 'sidebar-dialog',
      closeOnBackdropClick: false,
      ...options,
    })
  }

  closeSidebar() {
    if (this.ref) {
      this.ref.close()
    }
  }
}
