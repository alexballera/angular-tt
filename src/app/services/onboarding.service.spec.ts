import { of } from 'rxjs'
import 'ts-jest'
import { OnboardingService } from './onboarding.service'

describe('OnboardingService', () => {
  let service
  let preventOpenOnboardingSpy

  let contextServiceMock = {
    hasOnboarding$: of(true),
  }

  beforeEach(() => {
    service = new OnboardingService(contextServiceMock as any)
    preventOpenOnboardingSpy = jest.spyOn(service, 'setPreventOpenOnboarding')
  })

  it('should be prevent onboarding false at begin', () => {
    expect(!service.isPreventOpenOnboarding()).toBeTruthy()
  })

  it('should be prevent onboarding false at begin with module validation', () => {
    contextServiceMock = {
      hasOnboarding$: of(false),
    }
    service = new OnboardingService(contextServiceMock as any)

    expect(service.isPreventOpenOnboarding(true)).toBeTruthy()
  })

  it('should be preventOpenOnboarding is called', () => {
    service.setPreventOpenOnboarding(true)
    expect(preventOpenOnboardingSpy).toHaveBeenCalled()
  })

  it('should be prevent onboarding if isPreventOpenOnboarding is true', () => {
    service.setPreventOpenOnboarding(true)
    expect(service.isPreventOpenOnboarding()).toBeTruthy()
  })

  it('should be prevent onboarding if isPreventOpenOnboarding is true with module validation', () => {
    service.setPreventOpenOnboarding(true)
    expect(service.isPreventOpenOnboarding(true)).toBeTruthy()
  })
})
