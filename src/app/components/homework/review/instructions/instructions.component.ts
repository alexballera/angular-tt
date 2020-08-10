import { Component, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'
import get from 'lodash/fp/get'
import { Observable } from 'rxjs'
import { map, pluck } from 'rxjs/operators'
import { HomeworkService } from './../../homework.service'
@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss'],
})
export class InstructionsComponent implements OnInit {
  instructions$: Observable<any>
  files$: Observable<any>
  images: any

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private homeworkService: HomeworkService
  ) {}

  ngOnInit() {
    this.instructions$ = this.homeworkService.selectedStudentAssignment$.pipe(
      pluck('assignment'),
      map((assignment: any) => {
        const attachments = assignment.attachments.map(att => att.url)
        return { ...assignment, attachments }
      })
    )
    this.files$ = this.instructions$.pipe(
      map(instruction => instruction.attachments.map(att => att.url))
    )
  }

  closeDialog() {
    this.dialogRef.close()
  }
}
