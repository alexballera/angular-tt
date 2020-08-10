import { LayoutModule } from '@angular/cdk/layout'
import { registerLocaleData } from '@angular/common'
import { HttpClientModule } from '@angular/common/http';
import localeEs from '@angular/common/locales/es'
import localeEsExtra from '@angular/common/locales/extra/es'
import {
  APP_INITIALIZER,
  InjectionToken,
  LOCALE_ID,
  NgModule,
} from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { NbEvaIconsModule } from '@nebular/eva-icons'
import {
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbThemeModule,
} from '@nebular/theme'
import { EffectsModule } from '@ngrx/effects'
import { ActionReducerMap, State, StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { RedirectStrategyModule } from '@ticmas/auth-service'
import { ApiServicesModule, ConsoleLoggerModule } from '@ticmas/common-services'
import { NgxHotjarModule, NgxHotjarRouterModule } from 'ngx-hotjar'
import { environment } from '../environments/environment'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ComponentsModule } from './components/components.module'
import { ChatPageModule } from './components/pages/chat-page/chat-page.module'
import { ContactPageModule } from './components/pages/contact-page/contact-page.module'
import { effects } from './effects'
import * as reducers from './reducers'
import { devMetaReducers, prodMetaReducers } from './reducers/meta'
import { ServicesModule } from './services/services.module'
import { TutorModule } from './tutor/tutor.module'

export const reducerToken = new InjectionToken<
  ActionReducerMap<State<reducers.State>>
>('Registered Reducers')

export function setDocumentTitle(titleService: Title) {
  return () => {
    titleService.setTitle(environment.documentTitle || 'Docentes')
  }
}

registerLocaleData(localeEs, 'es', localeEsExtra)

let requiredModules = [
  BrowserModule,
  HttpClientModule,
  AppRoutingModule,
  ComponentsModule,
  ServicesModule,
  RedirectStrategyModule,
  ApiServicesModule,
  StoreModule.forRoot(reducerToken, {
    metaReducers: environment.production ? prodMetaReducers : devMetaReducers,
  }),
  EffectsModule.forRoot(effects),
  StoreDevtoolsModule.instrument({ logOnly: environment.production }),
  NoopAnimationsModule,
  NbThemeModule.forRoot({ name: 'default' }),
  NbLayoutModule,
  NbEvaIconsModule,
  NbIconModule,
  NbMenuModule.forRoot(),
  NbSidebarModule.forRoot(),
  NbDialogModule.forRoot(),
  LayoutModule,
  TutorModule,
  ChatPageModule,
  ContactPageModule,
]

if (environment.production) {
  requiredModules = requiredModules.concat([ConsoleLoggerModule])
}

if (environment.hotjarId) {
  requiredModules.push(NgxHotjarModule.forRoot(environment.hotjarId))
  requiredModules.push(NgxHotjarRouterModule)
}

@NgModule({
  declarations: [AppComponent],
  imports: [...requiredModules],
  providers: [
    { provide: reducerToken, useValue: reducers },
    { provide: LOCALE_ID, useValue: 'es' },
    { provide: 'ENV', useValue: environment },
    {
      provide: APP_INITIALIZER,
      useFactory: setDocumentTitle,
      deps: [Title],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
