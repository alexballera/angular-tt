import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core'
import { Subscription } from 'rxjs'
import { ChatService } from '../chat.service'
import { Channel } from '../models'

@Component({
  selector: 'ticmas-chat-panel',
  templateUrl: './chat-panel.component.html',
  styleUrls: ['./chat-panel.component.scss'],
})
export class ChatPanelComponent implements OnInit, OnDestroy {
  channel: any = {
    history: [],
  }
  channelSub: Subscription
  username: string
  usernameSub: Subscription

  constructor(public chatService: ChatService) {}

  sendMessage({ message }) {
    if (!/^\s*$/.test(message)) {
      this.chatService.send(message, this.channel)
    }
  }

  ngOnInit() {
    this.channelSub = this.chatService.selectedChannel$.subscribe((c: any) => {
      this.channel = c
    })
    this.usernameSub = this.chatService.username$.subscribe(u => {
      this.username = u.trim()
    })
  }

  ngOnDestroy() {
    this.channelSub.unsubscribe()
    this.usernameSub.unsubscribe()
  }

  trackByFn(index, item) {
    return index + item.from + item.timestamp
  }
}
