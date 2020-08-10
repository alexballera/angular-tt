import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { ParentsEffects } from './effects'
import { reducers } from './reducers'

export const featureName = '@ticmas/parents'

@NgModule({
  imports: [
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([ParentsEffects]),
  ],
})
export class NgRxModule {}
