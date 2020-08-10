import {
  DistributionGroup as CSDistributionGroup,
  Group,
} from '@ticmas/common-interfaces'

export interface Channel {
  jid: string
  name: string
  groupId: string
  parent: string
  groupName: string
  color: string
  users: any
  groupchat: boolean
  unreadMessages: number
  history: Array<{
    from: string
    avatarUrl: string
    body: string
    timestamp?: string
    mine?: boolean
    data_preview?: {}
  }>
}

export type ChannelGroup = Channel[]

export interface DistributionGroup extends Omit<CSDistributionGroup, 'course'> {
  topAncestor?: DistributionGroup
  group?: Group
}
