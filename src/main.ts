import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { set } from 'lodash'
import { AppModule } from './app/app.module'
import { customDomainMapping } from './custom-domains'
import { environment } from './environments/environment'

declare global {
  interface Window {
    __env: any
  }
}

const bootstrap = () =>
  new Promise(injectEnvScript)
    .then(addValuesToEnvironment)
    .then(setTheme)
    .then(() => {
      if (environment.production) {
        enableProdMode()
      }
      platformBrowserDynamic().bootstrapModule(AppModule)
    })

bootstrap().catch()

function injectEnvScript(onFinish, onError) {
  window.addEventListener('[TICMAS] bootstrap', onFinish)
  const script = document.createElement('script')
  script.src = 'env.js'
  document.head.append(script)
}

function addValuesToEnvironment() {
  Object.entries(window.__env).forEach(([k, v]) => {
    environment[k] = v
  })

  const domainOverrides = customDomainMapping[location.hostname]

  overrideEnvVariable(
    domainOverrides?.keycloakClientId ||
      getQueryStringVariable('keycloak_client_id'),
    'keycloak.config.clientId',
    'keycloak_client_id'
  )

  overrideEnvVariable(
    domainOverrides?.skinId || getQueryStringVariable('integration_skin_id'),
    'skin',
    'integration_skin_id'
  )

  overrideEnvVariable(
    getQueryStringVariable('login_hint'),
    'keycloak.loginOptions.loginHint'
  )

  overrideEnvVariable(
    domainOverrides?.keycloakURL,
    'keycloak.config.url',
    'keycloak_client_url'
  )

  overrideEnvVariable(domainOverrides?.sclURL, 'domains.scl')
}

function setTheme() {
  if (environment.theme) {
    document.body.classList.add('theme-' + environment.theme)
  }
}

function overrideEnvVariable(
  newValue: string,
  envPath: string,
  storageKey?: string
) {
  if (storageKey) {
    newValue = newValue || window.localStorage.getItem(storageKey)
  }
  if (newValue && storageKey) {
    window.localStorage.setItem(storageKey, newValue)
  }
  if (newValue) {
    set(environment, envPath, newValue)
  }
}

function getQueryStringVariable(variable: string) {
  return new URLSearchParams(window.location.search).get(variable)
}
