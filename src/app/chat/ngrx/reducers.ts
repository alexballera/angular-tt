import { Status } from '@bidi/chat-client'
import { ActionReducerMap } from '@ngrx/store'
import get from 'lodash/fp/get'
import partition from 'lodash/fp/partition'
import uniqBy from 'lodash/fp/uniqBy'
import { imgs } from '../stubs/imgs'
import {
  ChatActionTypes,
  ChatLoginFailure,
  ChatLoginSuccess,
  CreateChannelsFromDistributionGroups,
  IncomingMessage,
  MarkAsReadChannel,
  SelectChannel,
  SelectGroup,
  StatusChange,
} from './actions'

import { isBefore, parseISO } from 'date-fns'
import { findIndex } from 'lodash'
import { set } from 'lodash/fp'
import { DistributionGroupActions, UsersActions } from 'src/app/actions'

const getLastViewFromChannel = channelID => {
  const records = JSON.parse(localStorage.getItem('chatRecords'))
  return records[channelID]
}

const calculateUnreadMessages = (channelID, history) => {
  const lastView = getLastViewFromChannel(channelID)
  return history
    .map(i => {
      return !isBefore(parseISO(i.timestamp), parseISO(lastView))
    })
    .reduce((acc, score) => acc + score, 0)
}

export interface JidSerialized {
  local: string
  domain: string
  resource?: string
}

export function status(state = null, { type, payload }: StatusChange) {
  switch (type) {
    case ChatActionTypes.STATUS_CHANGE:
      return payload
    default:
      return state
  }
}

export function userJid(
  state = null,
  { type, payload }: ChatLoginSuccess & ChatLoginFailure
) {
  switch (type) {
    case ChatActionTypes.LOGIN_SUCCESS:
      return {
        local: payload.jid.getLocal(),
        domain: payload.jid.getDomain(),
        resource: payload.jid.getResource(),
      }
    case ChatActionTypes.LOGIN_FAILURE:
      return null
    default:
      return state
  }
}

export function channels(
  state = [],
  {
    type,
    payload,
    timestamp,
  }: CreateChannelsFromDistributionGroups & IncomingMessage & MarkAsReadChannel
) {
  switch (type) {
    case ChatActionTypes.CREATE_CHANNELS_FROM_DISTRIBUTION_GROUPS:
      const chatRecords = {}
      const newChannels = payload.groups.map(group => {
        const parent = group.topAncestor
        const channelId = `${group._id}@conference.${payload.host}`
        chatRecords[channelId] = new Date()
        return {
          jid: channelId,
          name: parent ? group.name : 'General',
          groupId: group._id,
          parent: parent ? parent._id : null,
          color: get('course.color', group),
          users: group.users.map(user => user.preferred_username),
          groupName:
            get('course.name', group) || (parent ? parent.name : group.name),
          groupchat: true,
          history: [],
        }
      })
      if (!localStorage.getItem('chatRecords')) {
        localStorage.setItem('chatRecords', JSON.stringify(chatRecords))
      }
      return uniqBy('jid', state.concat(newChannels))
    case ChatActionTypes.MARK_AS_READ_CHANNEL:
      const newState = [...state]
      const channelIndex = findIndex(newState, { jid: payload.jid })
      newState[channelIndex] = set('unreadMessages', 0, newState[channelIndex])

      return newState

    case ChatActionTypes.INCOMING_MESSAGE:
      if (payload.getChildText('error')) {
        return state
      }

      const [jid, sender] = payload.attrs.from.split('/')
      const body = payload.getChildText('body')
      const delay = payload.getChild('delay')
      const [[chan], rest] = partition(ch => ch.jid === jid, state)
      return [
        {
          ...chan,
          unreadMessages: calculateUnreadMessages(jid, chan.history),
          history: chan.history.concat({
            from: sender || jid,
            body,
            timestamp: delay ? delay.attr('stamp') : timestamp,
            avatarUrl: imgs[jid],
          }),
        },
        ...rest,
      ]
    case DistributionGroupActions.ADD_USERS_SUBGROUP_SUCCESS:
      return state.map(channel => {
        if (channel.groupId === payload.groupId) {
          return {
            ...channel,
            users: payload.users.map(user => user.preferred_username),
          }
        }
        return channel
      })
    case UsersActions.DELETE_SUCCESS:
      return state.map(channel => {
        if (channel.groupId === payload.groupId) {
          return {
            ...channel,
            users: channel.users.filter(user => user !== payload.userId),
          }
        }
        return channel
      })
    default:
      return state
  }
}

export function selectedGroup(state = null, { type, payload }: SelectGroup) {
  switch (type) {
    case ChatActionTypes.SELECT_GROUP:
      return get([0, 'groupId'], payload) || null
    default:
      return state
  }
}

export function selectedChannel(
  state = null,
  { type, payload }: SelectChannel
) {
  switch (type) {
    case ChatActionTypes.SELECT_CHANNEL:
      return get(['jid'], payload) || null
    default:
      return state
  }
}

export interface State {
  userJid: JidSerialized
  status: Status
  channels: any // TODO fix type
  selectedGroup: string
  selectedChannel: string
}

export const reducers: ActionReducerMap<State> = {
  userJid,
  status,
  channels,
  selectedGroup,
  selectedChannel,
}
