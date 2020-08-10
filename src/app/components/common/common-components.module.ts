import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { AutoCompleteModule } from 'primeng/autocomplete'
import { SharedModule } from '../../shared.module'
import { ContentsLibraryModule } from '../contents-library/contents-library.module'
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component'
import { DeleteButtonComponent } from './delete-button/delete-button.component'
import { GroupSelectorModule } from './group-selector/group-selector.module'
import { SearchBarComponent } from './search-bar/search-bar.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    GroupSelectorModule,
    ReactiveFormsModule,
    ContentsLibraryModule,
    AutoCompleteModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    DeleteButtonComponent,
    SearchBarComponent,
    CheckboxListComponent,
  ],
  exports: [
    DeleteButtonComponent,
    GroupSelectorModule,
    SharedModule,
    SearchBarComponent,
    CheckboxListComponent,
  ],
})
export class CommonComponentsModule {}
