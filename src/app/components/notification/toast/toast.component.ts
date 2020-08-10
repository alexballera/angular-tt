import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { Notification } from '../../models'

@Component({
  selector: 'ticmas-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @Input() notification: Notification
  @Input() duration = 3000
  @Output() remove = new EventEmitter<Notification>()
  interactive = false
  private timeout

  clearTimeout() {
    this.interactive = true
    clearTimeout(this.timeout)
  }

  close() {
    this.remove.emit(this.notification)
  }

  ngOnInit() {
    this.timeout = setTimeout(() => this.close(), this.duration)
  }
}
