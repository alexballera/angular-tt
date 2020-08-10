import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import flatten from 'lodash/fp/flatten'
import flow from 'lodash/fp/flow'
import get from 'lodash/fp/get'
import groupBy from 'lodash/fp/groupBy'
import has from 'lodash/fp/has'
import mapValues from 'lodash/fp/mapValues'
import set from 'lodash/fp/set'
import sortBy from 'lodash/fp/sortBy'
import values from 'lodash/fp/values'
import { map } from 'rxjs/operators'
import { DistributionGroupActions } from '../../../actions'
import { State } from '../../../reducers'
import { PlanificationService } from '../../../services/planification.service'

function findParent(group, list) {
  const parent = list.find(g => g._id === group.parent)
  if (!parent) {
    return null
  }
  return findParent(parent, list) || parent
}

const defaultAvatar = '/defaultAvatar.svg'

@Component({
  selector: 'search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  groups$
  users$
  search: string
  results: any[]
  userResults: any[]
  classroomResults: any[]
  groupResults: any[]

  constructor(
    private planification: PlanificationService,
    private router: Router,
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.users$ = this.planification.distributionGroups$.pipe(
      map(groups =>
        [].concat.apply(
          [],
          groups.map(({ _id, name, users, parent }) =>
            users.map(
              ({ given_name, family_name, preferred_username, picture }) => ({
                name: `${given_name.charAt(0).toUpperCase() +
                  given_name.slice(1)} ${family_name.charAt(0).toUpperCase() +
                  family_name.slice(1)}`,
                groupName: name,
                userName: preferred_username,
                photo: picture || defaultAvatar,
                classroomId: parent || _id,
              })
            )
          )
        )
      )
    )

    this.groups$ = this.planification.distributionGroups$.pipe(
      map(groupList =>
        flow(
          groupBy(g => get('_id', findParent(g, groupList)) || get('_id', g)),
          mapValues(sortBy(has('parent'))),
          mapValues(groups => set('0.hasChildren', groups.length > 1, groups)),
          values,
          flatten
        )(groupList)
      )
    )
  }

  onChangeSearch(event) {
    this.results = []
    this.userResults = []
    this.classroomResults = []
    this.groupResults = []
    this.users$
      .subscribe(users => {
        for (const user of users) {
          if (user.name.toLowerCase().includes(event.query.toLowerCase())) {
            this.userResults.push({
              ...user,
              type: 'student',
            })
          }
        }
      })
      .unsubscribe()
    this.groups$.subscribe(groups => {
      for (const group of groups) {
        if (group.name.toLowerCase().includes(event.query.toLowerCase())) {
          if (group.parent) {
            const classroomName = groups.filter(
              classroom => classroom._id === group.parent
            )[0].name
            this.groupResults.push({
              name: group.name,
              classroomName,
              type: 'group',
              classroomId: group.parent,
            })
          } else {
            this.classroomResults.push({
              name: group.name,
              category: group.category,
              students: group.users.length,
              type: 'classroom',
              classroomId: group._id,
            })
          }
        }
      }
    })

    this.results = [
      ...(this.userResults.length ? [{ subtitle: 'Estudiantes' }] : []),
      ...this.userResults,
      ...(this.classroomResults.length ? [{ subtitle: 'Clases' }] : []),
      ...this.classroomResults,
      ...(this.groupResults.length ? [{ subtitle: 'Grupos' }] : []),
      ...this.groupResults,
    ]
  }

  onSelect(event) {
    this.store.dispatch(DistributionGroupActions.select(event.classroomId))
    this.router.navigate(['clases/aulas'])
  }
}
