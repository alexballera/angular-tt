import {
  ContentData,
  UserInfo,
  WeeklyInteraction,
} from '@ticmas/common-interfaces'
import { DistributionGroup, WeeklyInteractionsMetrics } from './metrics'

export interface StudentsMetrics {
  selected: StudentData
  weeklyInteractions: Array<{
    actor: string
    results: WeeklyInteraction[]
  }>
}

export interface StudentData {
  info?: UserInfo
  group?: DistributionGroup
  metrics?: StudentRelatedMetrics
}

export interface StudentRelatedMetrics {
  all?: ContentData
  active?: ContentData
  weeklyInteractions?: WeeklyInteraction[]
}

export interface StudentMetrics {
  lastInteraction: any
  progress: { all: number; active: number }
  contents: {
    total: number
    attempted: number
    completed: number
    pending: number
  }
  activities: {
    total: number
    approved: number
    failed: number
  }
}
