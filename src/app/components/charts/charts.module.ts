import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ChartService } from './chart.service'
import { ChartComponent } from './chart/chart.component'

@NgModule({
  declarations: [ChartComponent],
  imports: [CommonModule],
  providers: [ChartService],
  exports: [ChartComponent],
})
export class ChartsModule {}
