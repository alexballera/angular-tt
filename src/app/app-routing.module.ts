import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from '@ticmas/auth-service'
import { HomeworkReviewComponent } from './components/homework/review/review.component'
import { MyClassroomsComponent } from './components/my-classrooms/my-classrooms.component'
import { PageLayoutComponent } from './components/page-layout/page-layout.component'
import { ChatPageComponent } from './components/pages/chat-page/chat-page.component'
import { ContentPreviewPageComponent } from './components/pages/content-preview-page/content-preview-page.component'
import { ContentsPageComponent } from './components/pages/contents-page/contents-page.component'
import { LibraryPageComponent } from './components/pages/library-page/library-page.component'
import { TutorTeachersPageComponent } from './tutor/tutor-teachers-page/tutor-teachers-page.component'

export const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/clases',
      },
      {
        path: 'clases',
        component: ContentsPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['teacher'] },
      },
      {
        path: 'clases/aulas',
        component: MyClassroomsComponent,
        canActivate: [AuthGuard],
        data: { roles: ['teacher'] },
      },
      {
        path: 'biblioteca',
        component: LibraryPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['teacher'] },
      },
      {
        path: 'biblioteca/:contentId',
        component: ContentPreviewPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['teacher'] },
      },
      {
        path: 'tutor-docentes',
        component: TutorTeachersPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['tutor'] },
      },
      {
        path: 'tareas/:homeworkId',
        component: HomeworkReviewComponent,
        canActivate: [AuthGuard],
        data: { roles: ['teacher'] },
      },
      {
        path: 'chat',
        component: ChatPageComponent,
        canActivate: [AuthGuard],
        data: { roles: ['teacher'] },
      },
      {
        path: 'crear-tarea',
        loadChildren: () =>
          import(
            './components/pages/create-homework-page/create-homework-page.module'
          ).then(m => m.CreateHomeWorkPageModule),
      },
      {
        path: 'tutoriales',
        loadChildren: () =>
          import(
            './components/pages/tutorials-page/tutorials-page.module'
          ).then(m => m.TutorialsPageModule),
      },
      {
        path: 'subir-contenido',
        loadChildren: () =>
          import('./upload-content/upload-content.module').then(
            m => m.UploadContentModule
          ),
      },
      {
        path: 'calendario',
        loadChildren: () =>
          import(
            './components/pages/calendar-prime-page/calendar-prime-page.module'
          ).then(m => m.CalendarPrimePageModule),
      },
      {
        path: 'contacto',
        loadChildren: () =>
          import('./components/pages/contact-page/contact-page.module').then(
            m => m.ContactPageModule
          ),
      },
    ],
  },
  {
    path: 'habilidades-siglo-xxi',
    loadChildren: () =>
      import('./soft-skills/soft-skills.module').then(m => m.SoftSkillsModule),
  },
  {
    path: 'abp',
    loadChildren: () => import('./abp/abp.module').then(m => m.AbpModule),
  },
  {
    path: 'programacion',
    loadChildren: () =>
      import('./programming/programming.module').then(m => m.ProgrammingModule),
  },
  {
    path: 'padres',
    loadChildren: () =>
      import('./parents/parents.module').then(m => m.ParentsModule),
  },
  {
    path: 'director',
    loadChildren: () =>
      import('./director/director.module').then(m => m.DirectorModule),
  },
  {
    path: 'registro-profesores',
    loadChildren: () =>
      import('./teachers/teachers.module').then(m => m.TeachersModule),
  },
  {
    path: '**',
    redirectTo: 'clases',
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
