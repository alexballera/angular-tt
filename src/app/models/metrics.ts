import {
  Asset,
  DistributionGroupInContext,
  Embed,
  PlannedContent,
  Resource as BaseResource,
} from '@ticmas/common-interfaces'

export interface DistributionGroup
  extends Omit<DistributionGroupInContext, 'contents'> {
  contents: Content[]
}

export interface Content extends Omit<PlannedContent, 'resource'> {
  resource: BaseResource
  dueDate: Date
  status: string
  daysToCurrent: number
}

export interface Resource extends Omit<BaseResource, 'assets'> {
  assets?: Array<
    Omit<
      Asset,
      'embeds' & {
        embeds: Array<Embed & { _id: string }>
      }
    >
  >
  dueDate: Date
  status: string
  daysToCurrent: number
}

export interface WeeklyInteractionsMetrics {
  detail: Array<{
    valueY: number
    valueX: string
  }>
  average: {
    hours: number
    minutes: number
  }
}
