import 'ts-jest'
import { OnboardingComponent } from './onboarding.component'

describe('OnboardingComponent', () => {
  let component: OnboardingComponent
  let closeSpy: jest.SpyInstance

  beforeEach(() => {
    component = new OnboardingComponent()
    component.icon = 'help-icon'
    closeSpy = jest.spyOn(component, 'closeOnboarding')
  })

  it('should be close called', () => {
    component.closeOnboarding('')
    expect(closeSpy).toHaveBeenCalled()
  })

  // esto no es tan necesario ahora porque tenemos otros
  // servicos como ts o angular service language
  // que se encargan de testear durante el desarrollo
  it('should be icon help-icon', () => {
    expect(component.icon).toBe('help-icon')
  })
})
