import { Inject, Injectable } from '@angular/core'
import { findIndex } from 'lodash'
import { combineLatest, of } from 'rxjs'
import { Environment } from '../models'
import { ContextService } from './context.service'

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  constructor(
    @Inject('ENV') private environment: Environment,
    private contextService: ContextService
  ) {}

  apps$ = this.environment.hasModules
    ? of([
        {
          title: 'Clases',
          link: '/',
          icon: 'book-open-outline',
          color: '#44d9f2',
          isEnable: false,
          moduleKey: 'curricula',
        },
        {
          title: 'Aprendizaje basado en proyectos',
          link: '/abp',
          icon: 'calendar-outline',
          color: '#29b180',
          isEnable: false,
          moduleKey: 'aprendizaje_basado_en_proyectos',
        },
        {
          title: 'Habilidades del Siglo XXI',
          link: '/habilidades-siglo-xxi',
          icon: 'shape',
          pack: 'ticmas-custom',
          color: '#fc9f00',
          isEnable: false,
          moduleKey: 'habilidades_blandas',
        },
        // {
        //   title: 'Programación',
        //   link: '/programacion',
        //   icon: 'code-outline',
        //   color: '#5441a0',
        //   isEnable: false,
        //   moduleKey: 'programacion',
        // },
      ])
    : of([])

  public modulesEnable$ = combineLatest(
    this.apps$,
    this.contextService.school$,
    (modules, school) => {
      if (!modules || !school) {
        return this.apps$
      }

      const schoolModules = school.config.modules
      return modules.map(m => {
        if (
          findIndex(schoolModules, sm => {
            return sm.key === m.moduleKey
          }) > -1
        ) {
          m.isEnable = true
        }

        return m
      })
    }
  )
}
