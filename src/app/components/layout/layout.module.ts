import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import {
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbLayoutModule,
  NbListModule,
  NbMenuModule,
  NbPopoverModule,
  NbSidebarModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme'
import { NotificationModule } from '../notification/notification.module'
import { OnboardingModule } from '../onboarding/onboarding.module'
import { ProfileModule } from '../profile/profile.module'
import { HeaderComponent } from './header/header.component'
import { LayoutComponent } from './layout.component'
import { LayoutService } from './layout.service'
import { PageTitleComponent } from './page-title/page-title.component'
import { SidenavComponent } from './sidenav/sidenav.component'

@NgModule({
  imports: [
    CommonModule,
    NbButtonModule,
    NbLayoutModule,
    NbSidebarModule,
    NbListModule,
    NbMenuModule,
    RouterModule,
    NbPopoverModule,
    NbIconModule,
    NbBadgeModule,
    NotificationModule,
    NbCardModule,
    NbUserModule,
    NbTooltipModule,
    NbDialogModule.forChild(),
    ProfileModule,
    OnboardingModule,
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    PageTitleComponent,
    SidenavComponent,
  ],
  exports: [LayoutComponent, NbLayoutModule, PageTitleComponent],
  providers: [LayoutService],
})
export class LayoutModule {}

export * from './layout.service'
