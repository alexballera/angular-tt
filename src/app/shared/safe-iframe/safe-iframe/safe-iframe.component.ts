import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core'
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-safe-iframe',
  templateUrl: './safe-iframe.component.html',
  styleUrls: ['./safe-iframe.component.scss'],
})
export class SafeIframeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() src: string
  @Input() messages: Observable<any>
  @ViewChild('iframe') iframe: ElementRef<HTMLIFrameElement>

  safeSrc: SafeResourceUrl
  private subscription: Subscription

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.sanitizeSrc()
    this.listenMessages()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.src) {
      this.sanitizeSrc()
    }
    if (changes.messages) {
      this.listenMessages()
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  private listenMessages() {
    if (this.messages) {
      this.subscription = this.messages.subscribe(msg => {
        if (msg && this.iframe) {
          this.iframe.nativeElement.contentWindow.postMessage(msg, '*')
        }
      })
    }
  }

  private sanitizeSrc() {
    this.safeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.src)
  }
}
