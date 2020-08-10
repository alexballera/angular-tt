import { DistributionGroup } from '@ticmas/common-interfaces'
import { Planning } from '../models'

export class PlanningActions {
  static SHOW_LIBRARY = '[Planning] SHOW_LIBRARY'
  static IMPORT = '[Planning] IMPORT'
  static IMPORT_SUCCESS = '[Planning] IMPORT_SUCCESS'
  static IMPORT_FAILURE = '[Planning] IMPORT_FAILURE'
  static EXPORT = '[Planning] EXPORT'
  static EXPORT_SUCCESS = '[Planning] EXPORT_SUCCESS'
  static EXPORT_FAILURE = '[Planning] EXPORT_FAILURE'

  static showLibrary = payload => ({
    type: PlanningActions.SHOW_LIBRARY,
    payload,
  })
  static import = (payload: {
    groupId: string
    planning: Planning
    date: Date
  }) => ({ type: PlanningActions.IMPORT, payload })
  static importSuccess = (payload: DistributionGroup) => ({
    type: PlanningActions.IMPORT_SUCCESS,
    payload,
  })
  static importFailure = payload => ({
    type: PlanningActions.IMPORT_FAILURE,
    payload,
  })
  static export = (payload: Planning) => ({
    type: PlanningActions.EXPORT,
    payload,
  })
  static exportSuccess = (payload: Planning) => ({
    type: PlanningActions.EXPORT_SUCCESS,
    payload,
  })
  static exportFailure = payload => ({
    type: PlanningActions.EXPORT_FAILURE,
    payload,
  })
}
