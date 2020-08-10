import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { isAfter } from 'date-fns'
import { Observable, Subscription } from 'rxjs'
import { HomeworkService } from '../homework.service'
import { AssignmentFormActions } from './../../../actions/assignmentForm'
import { DistributionGroupService } from './../../../services/distribution-group.service'
@Component({
  selector: 'app-create-homework',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateHomeworkComponent implements OnInit, OnDestroy {
  form: FormGroup
  noClassSelected: boolean = false
  dateInvalid: boolean = false
  subscriptions$: Subscription

  attachments$: Observable<Array<{ url: string; name: string; size: string }>>
  attachmentLoading$: Observable<boolean>

  allowedMimes = [
    'application/pdf',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.oasis.opendocument.spreadsheet',
    'application/vnd.oasis.opendocument.spreadsheet-template',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/*',
    'video/*',
  ]

  maxSizeDoc = 20
  maxSizeMedia = 200
  mega = 1000000

  imageSizeError = false
  documentSizeError = false

  mimesMaxSize = [
    { mime: 'image/*', maxSize: this.maxSizeMedia * this.mega },
    { mime: 'video/*', maxSize: this.maxSizeMedia * this.mega },
    { mime: 'application/*', maxSize: this.maxSizeDoc * this.mega },
  ]

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private distributionGroupService: DistributionGroupService,
    private store: Store<any>,
    private homeworkService: HomeworkService
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.maxLength(1000)]],
      dueAt: [new Date(), [Validators.required]],
    })
  }

  ngOnInit() {
    this.subscriptions$ = this.distributionGroupService.haveSelectedGroup$.subscribe(
      data => (this.noClassSelected = !data)
    )

    this.attachments$ = this.homeworkService.attachments$
    this.attachmentLoading$ = this.homeworkService.attachmentLoading$

    this.store.dispatch(AssignmentFormActions.resetAttachments())
  }

  get title() {
    return this.form.get('title')
  }

  get content() {
    return this.form.get('content')
  }

  handleDateChange(date) {
    this.form.controls.dueAt.setValue(date)
    const currentDate = new Date()
    currentDate.setHours(0, 0, 0, 0)
    this.dateInvalid = isAfter(currentDate, date)
  }

  onFileInputChange(file: File) {
    let sizeWithMeasureLetter
    if (file.size < 1000) {
      sizeWithMeasureLetter = file.size.toString() + ' B'
    } else if (file.size < this.mega) {
      sizeWithMeasureLetter = Math.ceil(file.size / 1000).toString() + ' K'
    } else {
      sizeWithMeasureLetter = Math.ceil(file.size / this.mega).toString() + ' M'
    }
    this.store.dispatch(
      AssignmentFormActions.uploadAttachment({
        file,
        name: file.name,
        size: sizeWithMeasureLetter,
      })
    )
  }

  removeAttachment(attachmentName: string) {
    this.store.dispatch(AssignmentFormActions.removeAttachment(attachmentName))
  }

  onFileError(file: File) {
    const [fileType] = file.type.split('/')

    if (fileType === 'image' || fileType === 'video') {
      this.documentSizeError = false
      this.imageSizeError = true
    }
    if (fileType === 'application') {
      this.imageSizeError = false
      this.documentSizeError = true
    }
  }

  clearFileErrors() {
    this.documentSizeError = false
    this.imageSizeError = false
  }

  submit() {
    const values = {
      ...this.form.value,
      dueAt: this.form.value.dueAt.toISOString(),
    }
    this.store.dispatch(AssignmentFormActions.saveAssignment(values))
  }

  resetForm() {
    this.form.reset()
    this.router.navigate(['/clases'])
  }

  ngOnDestroy() {
    this.subscriptions$.unsubscribe()
  }
}
