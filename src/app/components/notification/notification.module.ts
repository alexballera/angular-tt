import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NbIconModule } from '@nebular/theme'
import { StoreModule } from '@ngrx/store'
import { reducers } from './ngrx/reducers'
import { NotificationLauncherComponent } from './notification-launcher/notification-launcher.component'
import { NotificationService } from './notification.service'
import { NotificationsComponent } from './notifications/notifications.component'
import { ToastComponent } from './toast/toast.component'
import { ToastsComponent } from './toasts/toasts.component'

@NgModule({
  imports: [
    NbIconModule,
    CommonModule,
    StoreModule.forFeature(NotificationService.featureName, reducers),
  ],
  declarations: [
    NotificationsComponent,
    NotificationLauncherComponent,
    ToastComponent,
    ToastsComponent,
  ],
  exports: [
    NotificationsComponent,
    NotificationLauncherComponent,
    ToastsComponent,
  ],
  providers: [NotificationService],
})
export class NotificationModule {}

export * from './ngrx/actions'
export { NotificationService } from './notification.service'
