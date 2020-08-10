import { NgModule } from '@angular/core'
import { EffectsModule } from '@ngrx/effects'
import { StoreModule } from '@ngrx/store'
import { SoftSkillEffects } from './effects'
import { reducers } from './reducers'

export const featureName = '@ticmas/soft-skills'

@NgModule({
  imports: [
    StoreModule.forFeature(featureName, reducers),
    EffectsModule.forFeature([SoftSkillEffects]),
  ],
})
export class NgRxModule {}
