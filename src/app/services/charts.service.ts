import { Injectable } from '@angular/core'
import { ChartConfig } from '@ticmas/common-interfaces'

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  lineChart(config?: ChartConfig) {
    const setup: ChartConfig = {
      color: {
        lineSeries: '#44d9f2',
      },
      ...config,
    }

    return setup
  }
}
