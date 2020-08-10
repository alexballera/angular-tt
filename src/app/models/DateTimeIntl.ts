import { OwlDateTimeIntl } from 'ng-pick-datetime'
import { Injectable } from '@angular/core'

@Injectable()
export class DateTimeIntl extends OwlDateTimeIntl {
  upMinuteLabel = 'Incrementar minutos'
  downMinuteLabel = 'Decrementar minutos'
  upHourLabel = 'Incrementar hora'
  downHourLabel = 'Decrementar hora'
  cancelBtnLabel = 'Cancelar'
  setBtnLabel = 'Seleccionar'
}
