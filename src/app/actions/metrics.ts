export class MetricsActions {
  static GET_GROUPS_METRICS = '[Metrics] GET_GROUPS_METRICS'
  static GET_GROUPS_METRICS_SUCCESS = '[Metrics] GET_GROUPS_METRICS_SUCCESS'
  static GET_GROUPS_METRICS_FAILURE = '[Metrics] GET_GROUPS_METRICS_FAILURE'

  static GET_SELECTED_GROUP_METRICS = '[Metrics] GET_SELECTED_GROUP_METRICS'
  static GET_SELECTED_GROUP_METRICS_SUCCESS =
    '[Metrics] GET_SELECTED_GROUP_METRICS_SUCCESS'
  static GET_SELECTED_GROUP_METRICS_FAILURE =
    '[Metrics] GET_SELECTED_GROUP_METRICS_FAILURE'

  static GET_COURSES_METRICS = '[Metrics] GET_COURSES_METRICS'
  static GET_COURSES_METRICS_SUCCESS = '[Metrics] GET_COURSES_METRICS_SUCCESS'
  static GET_COURSES_METRICS_FAILURE = '[Metrics] GET_COURSES_METRICS_FAILURE'

  static GET_STUDENT_METRICS = '[Metrics] GET_STUDENT_METRICS'
  static GET_STUDENT_METRICS_SUCCESS = '[Metrics] GET_STUDENT_METRICS_SUCCESS'
  static GET_STUDENT_METRICS_FAILURE = '[Metrics] GET_STUDENT_METRICS_FAILURE'

  static GET_STUDENT_WEEKLY_METRICS = '[Metrics] GET_STUDENT_WEEKLY_METRICS'
  static GET_STUDENT_WEEKLY_METRICS_SUCCESS =
    '[Metrics] GET_STUDENT_WEEKLY_METRICS_SUCCESS'
  static GET_STUDENT_WEEKLY_METRICS_FAILURE =
    '[Metrics] GET_STUDENT_WEEKLY_METRICS_FAILURE'

  static GET_COURSES_METRICS_FROM_LAST_WEEK =
    '[Metrics] GET_COURSES_METRICS_FROM_LAST_WEEK'
  static GET_COURSES_METRICS_FROM_LAST_WEEK_SUCCESS =
    '[Metrics] GET_COURSES_METRICS_FROM_LAST_WEEK_SUCCESS'
  static GET_COURSES_METRICS_FROM_LAST_WEEK_FAILURE =
    '[Metrics] GET_COURSES_METRICS_FROM_LAST_WEEK_FAILURE'

  static getGroupsMetrics = () => ({
    type: MetricsActions.GET_GROUPS_METRICS,
  })
  static getGroupsMetricsSuccess = payload => ({
    type: MetricsActions.GET_GROUPS_METRICS_SUCCESS,
    payload,
  })
  static getGroupsMetricsFailure = payload => ({
    type: MetricsActions.GET_GROUPS_METRICS_FAILURE,
    payload,
  })

  static getSelectedGroupMetrics = payload => ({
    type: MetricsActions.GET_SELECTED_GROUP_METRICS,
    payload,
  })
  static getSelectedGroupMetricsSuccess = payload => ({
    type: MetricsActions.GET_SELECTED_GROUP_METRICS_SUCCESS,
    payload,
  })
  static getSelectedGroupMetricsFailure = payload => ({
    type: MetricsActions.GET_SELECTED_GROUP_METRICS_FAILURE,
    payload,
  })

  static getCoursesMetrics = () => ({
    type: MetricsActions.GET_COURSES_METRICS,
  })
  static getCoursesMetricsSuccess = payload => ({
    type: MetricsActions.GET_COURSES_METRICS_SUCCESS,
    payload,
  })
  static getCoursesMetricsFailure = payload => ({
    type: MetricsActions.GET_COURSES_METRICS_FAILURE,
    payload,
  })

  static getCoursesMetricsFromLastWeek = () => ({
    type: MetricsActions.GET_COURSES_METRICS_FROM_LAST_WEEK,
  })
  static getCoursesMetricsFromLastWeekSuccess = payload => ({
    type: MetricsActions.GET_COURSES_METRICS_FROM_LAST_WEEK_SUCCESS,
    payload,
  })
  static getCoursesMetricsFromLastWeekFailure = payload => ({
    type: MetricsActions.GET_COURSES_METRICS_FROM_LAST_WEEK_FAILURE,
    payload,
  })

  static getStudentMetrics = payload => ({
    type: MetricsActions.GET_STUDENT_METRICS,
    payload,
  })
  static getStudentMetricsSuccess = payload => ({
    type: MetricsActions.GET_STUDENT_METRICS_SUCCESS,
    payload,
  })
  static getStudentMetricsFailure = payload => ({
    type: MetricsActions.GET_STUDENT_METRICS_FAILURE,
    payload,
  })

  static getStudentWeeklyMetrics = payload => ({
    type: MetricsActions.GET_STUDENT_WEEKLY_METRICS,
    payload,
  })
  static getStudentWeeklyMetricsSuccess = payload => ({
    type: MetricsActions.GET_STUDENT_WEEKLY_METRICS_SUCCESS,
    payload,
  })
  static getStudentWeeklyMetricsFailure = payload => ({
    type: MetricsActions.GET_STUDENT_WEEKLY_METRICS_FAILURE,
    payload,
  })
}
