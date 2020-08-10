import { EMPTY, Observable, ObservableInput } from 'rxjs'
import { distinctUntilChanged, map, switchMap } from 'rxjs/operators'

export function ifObservable<T, T2 = T>(
  ifObs: Observable<any>,
  thenObs: Observable<T>,
  elseObs: Observable<T2> = EMPTY,
  condition = Boolean
): Observable<T | T2> {
  return ifObs.pipe(
    map<any, boolean>(condition),
    distinctUntilChanged(),
    switchMap<boolean, ObservableInput<T | T2>>(val =>
      val ? thenObs : elseObs
    )
  )
}
