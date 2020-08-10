import { AssignmentFormEffects } from './assignmentForm'
import { AssignmentEffects } from './assignments'
import { AttendedEffects } from './attended'
import { ClassroomIntegrationEffects } from './classroomIntegration'
import { CommentsEffects } from './comments'
import { ContextEffects } from './context'
import { CurriculaEffects } from './curricula'
import { GroupPlanificationEffects } from './distributionGroup'
import { EjabberdEffects } from './ejabber'
import { GroupEditEffects } from './groupEdit'
import { MetricsEffects } from './metricsEffects'
import { ResourcesEffects } from './resources'
import { RouterEffects } from './routerEffects'
import { StudentAdditionFormEffects } from './studentAdditionForm'
import { SubmissionsEffects } from './submissions'
import { UsersEffects } from './users'

export const effects = [
  CommentsEffects,
  ContextEffects,
  GroupEditEffects,
  GroupPlanificationEffects,
  UsersEffects,
  EjabberdEffects,
  ResourcesEffects,
  AttendedEffects,
  MetricsEffects,
  CurriculaEffects,
  StudentAdditionFormEffects,
  RouterEffects,
  AssignmentEffects,
  AssignmentFormEffects,
  SubmissionsEffects,
  ClassroomIntegrationEffects
]
