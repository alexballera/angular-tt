import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { DirectorEffects } from './effects'
import { reducers } from './reducers'

export const featureName = '@ticmas/director'

@NgModule({
  imports: [
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([DirectorEffects]),
  ],
})
export class NgRxModule {}
