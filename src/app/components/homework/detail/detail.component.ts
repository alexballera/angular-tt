import { Component, Input, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AssignmentActions } from 'src/app/actions'
import { HomeworkService } from '../homework.service'
@Component({
  selector: 'app-homework-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class HomeworkDetailComponent implements OnInit {
  orderType: string
  searchText = null

  studentAssignments$: Observable<any>

  constructor(
    private router: Router,
    private homeworkService: HomeworkService,
    private store: Store<any>
  ) {
    this.orderType = 'asc'
  }

  ngOnInit() {
    this.studentAssignments$ = this.homeworkService.studentAssignments$
  }

  handleOrderDate() {
    this.orderType = this.orderType === 'asc' ? 'des' : 'asc'
  }

  goToReview(homework: any) {
    this.store.dispatch(AssignmentActions.saveStudentAssignmentId(homework.id))
    this.router.navigateByUrl(`/tareas/${homework.id}`)
  }

  getState(state: string) {
    const type = {
      approved: 'Finalizada',
      expired: 'Expirada',
      unsubmitted: '--',
      pending: 'A corregir',
      rejected: 'Esperando devolución del estudiante',
    }
    return type[state]
  }
}
