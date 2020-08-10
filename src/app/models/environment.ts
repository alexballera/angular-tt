import { KeycloakEnvironment } from '@ticmas/auth-service'
export interface Environment extends KeycloakEnvironment {
  production: boolean
  environment: string
  hotjarId?: string
  gcpapikey: string
  gTagIds?: string[]
  hasModules: boolean
  apiEndpoint: string
  theme: string
  documentTitle: string
  skin?: string
  integrationsEndpoint?: string
}
