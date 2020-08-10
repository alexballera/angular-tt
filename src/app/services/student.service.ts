import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { GroupPlanificationEffects } from '../effects/distributionGroup'

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private groupEffects: GroupPlanificationEffects) {}

  additionToSubgroupSucceeded$: Observable<
    boolean
  > = this.groupEffects.studentsAddition$.pipe(
    map(({ succeeded }) => !!succeeded)
  )

  additionToSubgroupFailed$: Observable<
    boolean
  > = this.groupEffects.studentsAddition$.pipe(map(({ failed }) => !!failed))
}
