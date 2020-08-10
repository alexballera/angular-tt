import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'
import { Group } from '@ticmas/common-interfaces'
import { differenceInMinutes } from 'date-fns'
import get from 'lodash/fp/get'
import { RRule } from 'rrule'
import { ContextActions, DistributionGroupActions } from '../../../actions'
import { State } from '../../../reducers'
import { ContextService } from '../../../services/context.service'
import { DistributionGroupService } from '../../../services/distribution-group.service'
import { LayoutService } from '../../layout/layout.module'
@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  @Input() course: any
  @Output() toggleClassForm = new EventEmitter<boolean>()

  form: FormGroup

  editCategory = false
  editLevel = false
  days = [
    { key: RRule.MO.getJsWeekday() - 1, value: 'Lunes' },
    { key: RRule.TU.getJsWeekday() - 1, value: 'Martes' },
    { key: RRule.WE.getJsWeekday() - 1, value: 'Miércoles' },
    { key: RRule.TH.getJsWeekday() - 1, value: 'Jueves' },
    { key: RRule.FR.getJsWeekday() - 1, value: 'Viernes' },
    { key: RRule.SA.getJsWeekday() - 1, value: 'Sábado' },
    { key: RRule.SU.getJsWeekday() - 1, value: 'Domingo' },
  ]

  colors = [
    '#6f5cb8',
    '#6deebc',
    '#fbb431',
    '#4fdaf2',
    '#f39eb8',
    '#fcf095',
    '#35dd46',
    '#964120',
    '#db9ef3',
    '#dfcba8',
  ]

  activeDay = 0
  newScheduleAux
  schedulesUserData: any
  schedulesUser: any
  msgErr
  daysW = [
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
    'Domingo',
  ]

  constructor(
    private fb: FormBuilder,
    public contextService: ContextService,
    public distributionGroup: DistributionGroupService,
    private store: Store<State>,
    public sidebar: LayoutService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      subject: ['', [Validators.required]],
      level: ['', [Validators.required]],
      schedule: [[], [Validators.required]],
      color: ['', [Validators.required]],
      school: [''],
    })

    this.schedulesUserData = this.contextService.scheduleFilterBySelection$.subscribe(
      res => {
        this.schedulesUser = res
      }
    )

    const days = {}
    this.days.forEach(({ key, value }) => {
      days[key] = {
        day: value,
        horasEx: [],
      }
    })
    this.newScheduleAux = Object.values(days)
  }

  ngOnInit() {
    if (this.course) {
      if (this.course.parentGroup.category) {
        this.editCategory = true
      }
      if (this.course.parentGroup.level) {
        this.editLevel = true
      }
      this.name.setValue(this.course.name)
      this.color.setValue(this.course.color)
      this.descomposeRrule(this.course.schedule)
      this.level.setValue(this.course.parentGroup.level)
      this.subject.setValue(this.course.parentGroup.category)
      this.school.clearValidators()
    }
  }

  descomposeRrule(schedules) {
    schedules.map(sch => {
      const rrule = RRule.fromString(sch.rrule)
      const day = rrule.options.byweekday[0]
      const hour = rrule.options.byhour[0]
      const min = rrule.options.byminute[0]
      const duration = sch.duration
      const dEndEx = new Date(2000, 0, 0, 0, 0)
      const dStartEx = new Date(2000, 0, 0, 0, 0)
      dEndEx.setHours(hour, min)
      dStartEx.setHours(hour, min)
      dStartEx.setMinutes(dStartEx.getMinutes() + duration)
      this.newScheduleAux[day].horasEx.push({ from: dEndEx, to: dStartEx })
    })
    this.schedule.setValue(this.newScheduleAux)
  }

  selectDay(k) {
    this.activeDay = k
  }

  setSchedule(data) {
    const extras = data.extras
    const x = data.day
    let flag = false
    this.msgErr = ''
    extras.map(ex => {
      const hourExtraTo = ex.extra_to.split(':')
      const hourExtraFrom = ex.extra_from.split(':')
      const dEndEx = new Date(2000, 0, 0, 0, 0)
      const dStartEx = new Date(2000, 0, 0, 0, 0)
      dEndEx.setHours(parseInt(hourExtraTo[0], 0), parseInt(hourExtraTo[1], 0))
      dStartEx.setHours(
        parseInt(hourExtraFrom[0], 0),
        parseInt(hourExtraFrom[1], 0)
      )
      const hourExtraFromUtc = dStartEx.getHours()
      const minExtraFromUtc = dStartEx.getMinutes()
      const hourExtraToUtc = dEndEx.getHours()
      const minExtraToUtc = dEndEx.getMinutes()

      if (hourExtraToUtc < hourExtraFromUtc) {
        flag = true
      } else if (
        hourExtraToUtc === hourExtraFromUtc &&
        hourExtraToUtc < hourExtraFromUtc
      ) {
        flag = true
      }
      this.schedulesUser.forEach(e => {
        if (!e.deleted) {
          e.schedule.forEach(s => {
            const duration = s.duration / 60
            const rrule = RRule.fromString(s.rrule)
            let hour = rrule.options.byhour[0]
            const minute = rrule.options.byminute[0] / 60
            hour = hour + minute
            const hourEnd = hour + duration
            const daySelect = this.daysW.indexOf(x.value)
            const day = rrule.options.byweekday[0]

            if (day === daySelect) {
              const hourSelect = hourExtraFromUtc + minExtraFromUtc / 60
              const hourEndSelect = hourExtraToUtc + minExtraToUtc / 60
              if (hourSelect >= hour && hourSelect < hourEnd) {
                flag = true
              } else if (
                hourEndSelect > hour &&
                hourEndSelect <= hour + duration
              ) {
                flag = true
              } else if (hourSelect < hour && hourEndSelect > hour) {
                flag = true
              }
            }
          })
        }
      })
    })
    if (flag) {
      this.msgErr =
        'Ya se encuentra asignado este horario o se está cruzando con alguno'
    } else {
      this.newScheduleAux.forEach(nS => {
        if (nS.day === x.value) {
          if (extras) {
            extras.forEach(ex => {
              const hourExtraTo = ex.extra_to.split(':')
              const hourExtraFrom = ex.extra_from.split(':')
              const dEndEx = new Date(2000, 0, 0, 0, 0)
              const dStartEx = new Date(2000, 0, 0, 0, 0)
              dEndEx.setHours(
                parseInt(hourExtraTo[0], 0),
                parseInt(hourExtraTo[1], 0)
              )
              dStartEx.setHours(
                parseInt(hourExtraFrom[0], 0),
                parseInt(hourExtraFrom[1], 0)
              )
              nS.horasEx.push({ to: dEndEx, from: dStartEx })
            })
          }
        }
      })
      this.schedule.setValue(this.newScheduleAux)
    }
  }

  get name() {
    return this.form.get('name')
  }

  get subject() {
    return this.form.get('subject')
  }

  get level() {
    return this.form.get('level')
  }

  get schedule() {
    return this.form.get('schedule')
  }

  get color() {
    return this.form.get('color')
  }

  get school() {
    return this.form.get('school')
  }

  submit() {
    if (this.form.invalid) {
      return
    }
    let i = 0
    const schedule = []
    Object.values(this.schedule.value).forEach(sch => {
      // @ts-ignore
      if (sch.horasEx.length > 0) {
        // @ts-ignore
        sch.horasEx.forEach(hours =>
          schedule.push({
            rrule: new RRule({
              dtstart: new Date(1970, 0),
              freq: RRule.WEEKLY,
              byweekday: parseInt(i.toString(), 10),
              byhour: hours.from.getHours(),
              byminute: hours.from.getMinutes(),
            }).toString(),
            duration: differenceInMinutes(hours.to, hours.from),
          })
        )
      }
      i++
    })
    if (!this.editCategory || !this.editLevel) {
      this.updateDistributionGroup()
    }
    if (this.course) {
      this.updateCourse(schedule)
    } else {
      this.createCourse(schedule)
    }
  }

  updateCourse(schedule) {
    const newSchedule = {
      _id: this.course._id,
      name: this.name.value,
      color: this.color.value,
      schedule,
    }
    this.store.dispatch(ContextActions.update(newSchedule))
    this.closeSidebar()
  }

  createCourse(schedule) {
    const newSchedule = {
      name: this.name.value,
      subject: this.subject.value,
      level: this.level.value,
      color: this.color.value,
      schedule,
    }
    this.store.dispatch(ContextActions.create(newSchedule))
    this.closeSidebar()
  }

  updateDistributionGroup() {
    if (this.course) {
      const group = {
        id: this.course.parentGroup._id,
        course: {
          level: this.level.value,
          category: this.subject.value,
        },
      }
      this.store.dispatch(DistributionGroupActions.updateGroup(group))
    }
  }

  delete(i, j) {
    this.schedule.value[i].horasEx.splice(j, 1)
  }

  closeSidebar() {
    this.sidebar.closeSidebar()
  }

  selectSchool(school, s) {
    this.store.dispatch(ContextActions.setSchool(school))
  }
}
