import {
  DistributionGroup,
  Group,
  PlannedTheme,
  Resource,
  Statement,
  Theme,
} from '@ticmas/common-interfaces'
import { FormGroupState } from 'ngrx-forms'
import { DistributionGroupInContext } from '../models'
import { StudentAdditionFormValue } from './studentAddtionForm'

export * from './calendar'
export * from './comments'
export * from './context'
export * from './distributionGroup'
export * from './groupEdit'
export * from './lrsStatements'
export * from './notifications'
export * from './planning'
export * from './uiStates'
export * from './users'
export * from './userEomt'
export * from './ejabber'
export * from './bidi'
export * from './attended'
export * from './metrics'
export * from './studentAddtionForm'
export * from './resource'
export * from './assignmentForm'
export * from './assigments'
export * from './integrations'

export interface State {
  calendar: {
    selectedDate: Date
    weekDays: number[]
    weekStartsOn: number
    view: string
    hourScale: {
      from: [number, number]
      to: [number, number]
      step: number
    }
  }
  context: {
    lastFetched: Date
    list: Group[]
    selection: Group[]
    showDetail: any
    importCurricula: any
    showErrorCurricula: any
    tmpContext: any
    school: Group
    schools: Group[]
  }
  distributionGroup: {
    lastFetched: Date
    list: DistributionGroup[]
    selection?: string
    subgroupSelected?: string
    importCurricula: any
    showErrorCurricula: any
    editCourse: any
    usersForm: any
    attachContent: []
    attachFilesContent: any
    attachCoverLoading: boolean
  }
  groupEdit: {
    content: {
      distributionGroup?: DistributionGroupInContext
      date?: Date
      theme?: Theme
      resources?: Resource[]
      showModal: boolean
      showSelectThemeModal: boolean
    }
    theme: PlannedTheme
    user: {
      showModal: boolean
    }
    assignContentLoading: boolean
  }
  lrsStatements: {
    list: Statement[]
  }
  planning: {
    lastFetched: Date
    list: Resource[]
  }
  resources: {
    lastFetched: Date
    list: Resource[]
  }
  uiStates: {
    library: boolean
    loading: boolean
    showProfile: boolean
    showModal: boolean
    loadingSmall: boolean
    showLibrary: boolean
    showAddContentCustom: boolean
    showModalResetPassword: boolean
  }
  ejabberd: any[]
  notifications: {
    info: any[]
    revised: true
  }
  bidi: {
    token: string
    expiration: string
    redirect: string
  }
  studentAdditionForm: FormGroupState<StudentAdditionFormValue>
  recentUserResetData
  userResetData
  attended: any
  metrics: any
  userEomt: any
  previewResource: Resource
  editableResource: Resource
  assignments: {
    courseAssignments: any[]
    studentAssignments: any[]
    selectedStudentAssignmentId: number
  }
  assignmentForm: {
    attachments: Array<{ url: string; name: string; size: string }>
    attachmentLoading: boolean
  }
  integrations: {
    classroomLoading: boolean
  }
}
