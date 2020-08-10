export class ClassroomIntegrationActions {
  static SYNC_CLASSROOM_COURSES = '[ClassroomIntegration] SYNC_CLASSROOM_COURSES'
  static SYNC_CLASSROOM_COURSES_SUCCESS = '[ClassroomIntegration] SYNC_CLASSROOM_COURSES_SUCCESS'
  static SYNC_CLASSROOM_COURSES_FAILURE = '[ClassroomIntegration] SYNC_CLASSROOM_COURSES_FAILURE'

  static syncClassroomCourses = () => ({
    type: ClassroomIntegrationActions.SYNC_CLASSROOM_COURSES
  })
  static syncClassroomCoursesSuccess = () => ({
    type: ClassroomIntegrationActions.SYNC_CLASSROOM_COURSES_SUCCESS
  })
  static syncClassroomCoursesFailure = () => ({
    type: ClassroomIntegrationActions.SYNC_CLASSROOM_COURSES_FAILURE
  })
}