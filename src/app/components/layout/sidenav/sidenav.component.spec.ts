import { of, Subject } from 'rxjs'
import 'ts-jest'
import { SidenavComponent } from './sidenav.component'

const groups = [
  {
    category: 'Administración',
    color: 'ALGO',
    contents: [],
    context: 'ALGO',
    course: {
      _id: '5ef2627f2334ca001d15c94e',
      config: {},
      parent: {},
      deleted: false,
      classroomsNumber: 0,
      ancestors: [],
      code: '_M69RL',
      color: '#4fdaf2',
      name: 'Primera clase',
      persons: [],
      schedule: [],
      studentsNumber: 0,
      teachersNumber: 0,
    },
    deleted: false,
    level: '1er. Año - CABA',
    name: 'Primera clase',
    owners: [],
    registration: '0e9f8420-b58e-11ea-9b48-c1142d65fd87',
    themes: [],
    users: [],
    _id: '5ef2628006099f0018596767',
  },
]

const coursesMock = [
  {
    _id: '5ef2627f2334ca001d15c94e',
    config: {},
    parent: {},
    deleted: false,
    classroomsNumber: 0,
    ancestors: [],
    code: '_M69RL',
    color: '#4fdaf2',
    name: 'Primera clase',
    persons: [],
    schedule: [],
    studentsNumber: 0,
    teachersNumber: 0,
    parentGroup: {
      category: 'Administración',
      color: 'ALGO',
      contents: [],
      context: 'ALGO',
      course: {
        _id: '5ef2627f2334ca001d15c94e',
        config: {},
        parent: {},
        deleted: false,
        classroomsNumber: 0,
        ancestors: [],
        code: '_M69RL',
        color: '#4fdaf2',
        name: 'Primera clase',
        persons: [],
        schedule: [],
        studentsNumber: 0,
        teachersNumber: 0,
      },
      deleted: false,
      level: '1er. Año - CABA',
      name: 'Primera clase',
      owners: [],
      registration: '0e9f8420-b58e-11ea-9b48-c1142d65fd87',
      themes: [],
      users: [],
      _id: '5ef2628006099f0018596767',
    },
  },
]

const PlanificationSrvMock = {
  distributionGroups$: of(groups),
}

const router = {
  events: new Subject(),
}

const OnboardingSrvMock = {
  isPreventOpenOnboarding: () => {
    return false
  },
  isOnboardingFlagSetted: () => {
    return false
  },
}

describe('SidenavComponent', () => {
  let component: SidenavComponent
  let popoverShowSpy
  let closeOnboardingSpy

  beforeEach(() => {
    component = new SidenavComponent(
      PlanificationSrvMock as any,
      OnboardingSrvMock as any,
      router as any
    )
    component.popover = {
      show: () => {
        return true
      },
    } as any
    popoverShowSpy = jest.spyOn(component.popover, 'show')
    closeOnboardingSpy = jest.spyOn(component, 'closeOnboarding')
    component.ngOnInit()
  })

  test('should be courses$ has courses', done => {
    component.courses$.subscribe(courses => {
      expect(courses).toStrictEqual(coursesMock)
      done()
    })
  })

  test('it should be onboarding open', done => {
    component.ngAfterViewInit()
    expect(popoverShowSpy).toHaveBeenCalled()
    done()
  })

  test('it should be close onboarding on navigation', done => {
    component.ngAfterViewInit()
    router.events.next('navigation')
    setTimeout(() => {
      expect(closeOnboardingSpy).toHaveBeenCalled()
    }, 100)
    done()
  })
})
