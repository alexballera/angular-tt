import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { filter, map } from 'rxjs/operators'
import { AssignmentActions } from '../../../actions'
import { HomeworkService } from './../homework.service'

@Component({
  selector: 'app-homework-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class HomeworkListComponent implements OnInit {
  loading = true

  courseAssignments$: Observable<any>

  orderType: string

  constructor(
    private store: Store<any>,
    private router: Router,
    private homeworkService: HomeworkService
  ) {
    this.orderType = 'asc'
  }

  ngOnInit() {
    this.store.dispatch(AssignmentActions.getAssignments())

    this.courseAssignments$ = this.homeworkService.courseAssignments$.pipe(
      filter(Boolean),
      map((data: any) =>
        data.map((task, index: number) => {
          if (index === 0) {
            return { ...task, selected: true }
          }
          return { ...task, selected: false }
        })
      )
    )
  }

  handleOrderDate() {
    this.orderType = this.orderType === 'asc' ? 'des' : 'asc'
  }

  handleSelected(id: string) {
    this.courseAssignments$ = this.courseAssignments$.pipe(
      map((data: any) =>
        data.map(task => {
          if (task.id === id) {
            return { ...task, selected: true }
          }
          return { ...task, selected: false }
        })
      )
    )
    this.store.dispatch(AssignmentActions.getStudentAssignments(id))
  }

  goToCreateHomework() {
    this.router.navigate(['crear-tarea'])
  }
}
