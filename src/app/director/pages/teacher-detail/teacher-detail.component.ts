import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { DirectorMetricsService } from '../../services/metrics.service'

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss'],
})
export class TeacherDetailComponent implements OnInit {
  courseSelect = ''
  randomcolor: string
  acronym: string
  teacher$: Observable<any>

  constructor(
    private router: Router,
    private metricsServices: DirectorMetricsService
  ) {}

  ngOnInit() {
    this.teacher$ = this.metricsServices.selectTeacher$.pipe(
      tap(teacher => {
        if (teacher.name) {
          this.acronym = teacher.name.charAt(0) + teacher.family_name.charAt(0)
          this.randomcolor =
            'color-ticmas-' + (Math.floor(Math.random() * 4) + 1)
        } else {
          this.router.navigate(['/director/listing'])
        }
      })
    )
  }
}
