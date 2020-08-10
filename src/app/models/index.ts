import {
  Content,
  ContentData,
  DistributionGroup,
  Group,
  Theme,
} from '@ticmas/common-interfaces'
export * from './environment'

export interface DistributionGroupInContext
  extends Omit<DistributionGroup, 'course'> {
  course: Group
  groupSummary?: any
}

export interface PlannedDay {
  date: Date
  schedule: Array<{
    context: Group
    subjects: string[]
    ancestorsNames: string
    color: string
    themes: Theme[]
    percentStart?: number
    percentDuration?: number
  }>
  planification: {
    [groupId: string]: {
      group: DistributionGroupInContext
      themes: Theme[]
      contents: Content[]
      dueContents: Content[]
      color?: string
    }
  }
  groupColors?: {
    [groupId: string]: string
  }
}

export type Planning = any

export interface AddStudentToGroup {
  add: boolean
  group: boolean
  subgroup: boolean
}

export interface SelectedGroupMetric {
  [key: string]: {
    all: ContentData
    active: ContentData
  }
}
