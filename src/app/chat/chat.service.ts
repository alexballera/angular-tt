import { Inject, Injectable } from '@angular/core'
import ChatClient, { Config, JID } from '@bidi/chat-client'
import { createFeatureSelector, select, Store } from '@ngrx/store'
import camelCase from 'lodash/fp/camelCase'
import deburr from 'lodash/fp/deburr'
import differenceBy from 'lodash/fp/differenceBy'
import flow from 'lodash/fp/flow'
import set from 'lodash/fp/set'
import toLower from 'lodash/fp/toLower'
import { combineLatest, Observable, of, Subscription } from 'rxjs'
import {
  filter,
  map,
  pairwise,
  shareReplay,
  startWith,
  withLatestFrom,
} from 'rxjs/operators'
import { Channel, ChannelGroup, DistributionGroup } from './models'
import { ifObservable } from './ngrx-helpers'
// import { DispatchNotification } from '../notification/ngrx/actions'
import {
  ChatLogin,
  ChatLogout,
  CreateChannelsFromDistributionGroups,
  IncomingMessage,
  MarkAsReadChannel,
  OutgoingMessage,
  SelectChannel,
  SelectGroup,
  StatusChange,
} from './ngrx/actions'
import { State } from './ngrx/reducers'

@Injectable()
export class ChatService {
  static featureName = '@ticmas/common-components Chat'

  chatClient: ChatClient

  private subscription: Subscription

  private state$: Observable<State> = this.store.pipe(
    select(createFeatureSelector(ChatService.featureName))
  )

  private sanitizeUsername = flow(deburr, camelCase, toLower)

  userJid$: Observable<JID> = this.state$.pipe(
    select('userJid'),
    filter(Boolean),
    map<State['userJid'], JID>(
      ({ local, domain, resource }) => new JID(local, domain, resource)
    )
  )

  username$: Observable<string> = this.state$.pipe(select('userJid', 'local'))

  loggedIn$: Observable<boolean> = this.state$.pipe(
    select('status'),
    map(s => s === 'online')
  )

  channels$: Observable<Channel[]> = ifObservable(
    this.loggedIn$,
    this.state$.pipe(select('channels')),
    of([])
  )

  selectedGroup$: Observable<ChannelGroup> = combineLatest([
    this.channels$,
    this.state$.pipe(select('selectedGroup')),
  ]).pipe(
    map(([channels, groupId]) =>
      channels.filter(chan => chan.groupId === groupId)
    ),
    shareReplay(1)
  )

  selectedChannel$: Observable<Channel> = combineLatest([
    this.channels$,
    this.state$.pipe(select('selectedChannel')),
  ]).pipe(
    map(([channels, jid]) => channels.find(chan => chan.jid === jid)),
    withLatestFrom(this.userJid$),
    map(
      ([channel, jid]) =>
        channel && {
          ...channel,
          history: channel.history.map(msg => ({
            ...msg,
            mine: msg.from === jid.bare().toString(),
          })),
        }
    ),
    shareReplay(1)
  )

  constructor(
    @Inject('ENV') private environment,
    private store: Store<State>
  ) {}

  private saveChatRecordsFromStorage(channel, date) {
    const records = JSON.parse(localStorage.getItem('chatRecords'))
    records[channel] = date
    localStorage.setItem('chatRecords', JSON.stringify(records))
  }

  haveUnreadMessages$: Observable<boolean> = this.channels$.pipe(
    map(channels => {
      return channels.some(channel => {
        return channel.unreadMessages > 0
      })
    })
  )

  countUnreadMessages$: Observable<number> = this.channels$.pipe(
    map(channels => {
      return channels
        .map(channel => {
          return channel.unreadMessages || 0
        })
        .reduce((accumulator, newUnread) => {
          return accumulator + newUnread
        }, 0)
    })
  )

  markAsReadInChannel(channel) {
    this.saveChatRecordsFromStorage(channel.jid, new Date())
    this.store.dispatch(new MarkAsReadChannel(channel))
  }

  initClient(config: Config): this {
    this.destroyClient()

    this.chatClient = new ChatClient(config)
      .onMessage(msg => {
        if (msg.getChild('error')) {
          // this.store.dispatch(
          //   new DispatchNotification({
          //     type: 'error',
          //     text: 'Ocurrió un problema con el servidor de chat'
          //   })
          // )
        } else {
          this.store.dispatch(new IncomingMessage(msg))
        }
      })
      .onStatusChange(status => this.store.dispatch(new StatusChange(status)))

    return this
  }

  login(
    username: string,
    distributionGroups$: Observable<DistributionGroup[]>
  ) {
    const { host, endpoint } = this.environment.chat

    this.store.dispatch(
      new ChatLogin({
        service: endpoint,
        username: this.sanitizeUsername(username),
        password: '1234',
      })
    )

    this.subscription = distributionGroups$
      .pipe(
        map(groups =>
          groups.map(group =>
            set('topAncestor', this.findParentGroup(group, groups), group)
          )
        ),
        startWith([]),
        pairwise(),
        map(([prev, curr]) => differenceBy('_id', curr, prev))
      )
      .subscribe(groups => {
        this.store.dispatch(
          new CreateChannelsFromDistributionGroups({ groups, host })
        )
      })
  }

  logout() {
    this.store.dispatch(new ChatLogout())

    this.destroyClient()

    if (this.subscription) {
      this.subscription.unsubscribe()
      this.subscription = null
    }
  }

  selectGroup(group: ChannelGroup) {
    this.store.dispatch(new SelectGroup(group))
  }

  selectChannel(channel: Channel) {
    this.store.dispatch(new SelectChannel(channel))
  }

  send(message, to: Channel) {
    this.store.dispatch(new OutgoingMessage({ message, to }))
  }

  private destroyClient() {
    if (this.chatClient) {
      this.chatClient.destroy()
      this.chatClient = null
    }
  }

  private findParentGroup(
    group: DistributionGroup,
    list: DistributionGroup[],
    depth = 0
  ): DistributionGroup {
    const parent = list.find(g => g._id === group.parent)
    if (depth >= 10 || !parent) {
      return null
    }
    return this.findParentGroup(parent, list, depth++) || parent
  }
}
