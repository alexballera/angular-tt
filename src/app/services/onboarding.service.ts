import { Injectable } from '@angular/core'
import { take } from 'rxjs/operators'
import { ContextService } from './context.service'

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  public preventOpenOnboarding = false
  private hasOnboarding = false

  constructor(private contextService: ContextService) {
    this.contextService.hasOnboarding$.subscribe(hasOnboarding => {
      if (hasOnboarding !== undefined) {
        this.hasOnboarding = hasOnboarding
      }
    })
  }

  setPreventOpenOnboarding(value: boolean) {
    this.preventOpenOnboarding = value
  }

  isPreventOpenOnboarding(validateModule: boolean = false) {
    if (validateModule) {
      return !this.hasOnboarding || this.preventOpenOnboarding
    } else {
      return this.preventOpenOnboarding
    }
  }

  setOnboardingFlag(onboardingFlag: string) {
    localStorage.setItem(onboardingFlag, 'true')
  }

  isOnboardingFlagSetted(onboardingFlag: string) {
    return JSON.stringify(localStorage.getItem(onboardingFlag)) !== 'null'
  }
}
