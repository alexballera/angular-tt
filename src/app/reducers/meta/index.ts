import { storeFreeze } from 'ngrx-store-freeze'
import { NgrxMetareducers } from '../../ngrx-helpers'

export const devMetaReducers = [
  NgrxMetareducers.resetState,
  NgrxMetareducers.timestamp,
  NgrxMetareducers.setRootState,
  storeFreeze,
]

export const prodMetaReducers = [
  NgrxMetareducers.resetState,
  NgrxMetareducers.timestamp,
]
