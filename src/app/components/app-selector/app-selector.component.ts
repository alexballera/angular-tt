import { Component, Inject } from '@angular/core'
import { Router } from '@angular/router'
import { NbDialogRef, NbDialogService, NbIconLibraries } from '@nebular/theme'
import { Environment } from '../../../app/models'
import { LayoutService } from '../../services/layout.service'
import { InfoDialogComponent } from './info-dialog/info-dialog.component'

@Component({
  selector: 'app-selector',
  templateUrl: './app-selector.component.html',
  styleUrls: ['./app-selector.component.scss'],
})
export class AppSelectorComponent {
  private ref: NbDialogRef<any>
  hasModules: boolean
  constructor(
    private router: Router,
    private dialogService: NbDialogService,
    private iconLibraries: NbIconLibraries,
    public layoutService: LayoutService,
    @Inject('ENV') private environment: Environment
  ) {
    this.iconLibraries.registerSvgPack('ticmas-custom', {
      shape:
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 34 29" style="enable-background:new 0 0 34 29;" xml:space="preserve"><style type="text/css">.st0{fill:none;stroke:#FEA000;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;}</style><g id="Grupo_3030" transform="translate(-393.917 293.344)"><path id="Trazado_1853" class="st0" d="M402.4-277.7l3.3,5.7l3.3,5.7h-13.1l3.3-5.7L402.4-277.7z"/><rect id="Rectángulo_979" x="413.7" y="-278" class="st0" width="11.4" height="11.4"/><circle id="Elipse_653" class="st0" cx="408.1" cy="-285.2" r="5.6"/></g></svg>',
    })

    this.hasModules = this.environment.hasModules
  }

  goToModule(module) {
    if (module.isEnable) {
      this.router.navigateByUrl(module.link)
    }

    if (!module.isEnable) {
      switch (module.moduleKey) {
        case 'habilidades_blandas':
          this.openDialog(InfoDialogComponent, 'sxxi')
          break
        case 'aprendizaje_basado_en_proyectos':
          this.openDialog(InfoDialogComponent, 'abp')
          break
        case 'programacion':
          this.openDialog(InfoDialogComponent, 'programming')
          break
      }
    }
  }

  private openDialog(template, type) {
    this.ref = this.dialogService.open(template, {
      context: { type },
      dialogClass: 'dialog',
      closeOnBackdropClick: false,
    })
  }

  closeDialog() {
    if (this.ref) {
      this.ref.close()
    }
  }
}
