import { Component, OnDestroy, OnInit } from '@angular/core'
import get from 'lodash/fp/get'
import { Observable, Subscription } from 'rxjs'
import { map } from 'rxjs/operators'
import { ChatService } from '../chat.service'
import { Channel } from '../models'

@Component({
  selector: 'ticmas-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit, OnDestroy {
  searchChat: string

  channelsSubs$: Subscription
  channels$: Observable<Channel[]> = this.chatService.channels$

  selectedGroupId$: Observable<string> = this.chatService.selectedGroup$.pipe(
    map(get([0, 'groupId']))
  )

  openChat(channel) {
    this.chatService.markAsReadInChannel(channel)
    this.chatService.selectChannel(channel)
  }

  constructor(public chatService: ChatService) {}
  ngOnInit(): void {
    this.channelsSubs$ = this.channels$.subscribe(c =>
      this.chatService.selectChannel(c[0])
    )
  }

  ngOnDestroy() {
    this.channelsSubs$.unsubscribe()
  }
}
