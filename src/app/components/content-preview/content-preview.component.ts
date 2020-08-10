import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core'
import { Router } from '@angular/router'
import { NbPopoverDirective } from '@nebular/theme'
import {
  addDays,
  differenceInDays,
  format,
  formatDistanceToNow,
} from 'date-fns'
import groupBy from 'lodash/groupBy'
import { OnboardingService } from 'src/app/services/onboarding.service'
import { PreviousRouteService } from 'src/app/services/previous-route.service'

@Component({
  selector: 'ticmas-content-preview',
  templateUrl: './content-preview.component.html',
  styleUrls: ['./content-preview.component.scss'],
})
export class ContentPreviewComponent
  implements OnInit, OnChanges, AfterViewInit {
  constructor(
    private onboardingSrv: OnboardingService,
    private previousRouteService: PreviousRouteService,
    private router: Router
  ) {}

  @Input() resource
  @Input() saveResource
  @Input() themes
  @Input() dataEditResource
  @Output() resSelected = new EventEmitter<any>()
  @Output() newTheme = new EventEmitter<boolean>()
  @Output() guideView = new EventEmitter<boolean>()
  @Output() showPublicator = new EventEmitter<any>()
  @ViewChild(NbPopoverDirective) popover: NbPopoverDirective
  isOpenDropdown: boolean = false
  indexAssets: number = 1
  contentPreviewButtonText: string = 'Contenido actual'
  themeSelect: any
  theme: any
  sinceDate
  data: any
  resourceProcessed
  idContent: any
  startDate: any
  endDate: any
  flag = false
  msgErr: string
  msgErrT: string
  msgErrDatePlanning: boolean
  contentEdit = false
  titleE: string
  abstractE: string
  tagsCustom = []
  tagsContenido = []
  versionDesk = true
  widthIframe = 100
  heightIframe = 100
  private innerValue
  private onChangeCallback: (_: Date) => void

  beforeP = 0
  afterP = 1
  positionAsset = 0

  role = 'teacher'

  assetsPreview

  viewGuide = false
  pdfGuide: string

  get value() {
    return this.innerValue
  }

  set value(date: Date) {
    if (this.innerValue !== date) {
      this.innerValue = date
    }

    if (this.onChangeCallback) {
      this.onChangeCallback(this.innerValue)
    }
  }

  ngAfterViewInit() {
    this.openOnboarding('content-preview-onboarding')
  }

  showPublicatorSidebar(resourceProcessed) {
    this.onboardingSrv.setPreventOpenOnboarding(true)
    this.showPublicator.emit(resourceProcessed)
  }

  openOnboarding(onboarding) {
    if (
      !this.onboardingSrv.isPreventOpenOnboarding(false) &&
      !this.onboardingSrv.isOnboardingFlagSetted(onboarding)
    ) {
      this.popover.show()
    }
  }

  closeOnboarding(val) {
    if (val === 'notShowAgain') {
      this.onboardingSrv.setOnboardingFlag('content-preview-onboarding')
    }
    this.popover.hide()
  }

  goBack() {
    if (this.previousRouteService.getPreviousUrl()) {
      this.router.navigate([this.previousRouteService.getPreviousUrl()])
    } else {
      this.router.navigate(['/biblioteca'])
    }
  }

  ngOnInit() {
    this.pdfGuide = this.resource.guideUrl
    this.getContEje()
    this.msgErrDatePlanning = false
    this.sinceDate = formatDistanceToNow(new Date(this.resource.publishedAt), {
      addSuffix: true,
    })

    if (this.dataEditResource) {
      this.endDate = addDays(
        addDays(this.dataEditResource.startDate, 1),
        this.dataEditResource.duration
      )
      this.startDate = addDays(this.dataEditResource.startDate, 1)
      this.themeSelect = this.dataEditResource.theme
      this.theme = this.dataEditResource.theme
      this.idContent = this.dataEditResource._id
    }
  }

  ngOnChanges(changes) {
    if (changes.resource) {
      if (this.resource.type === 'planning') {
        const groupedContents = groupBy(this.resource.contents, 'theme._id')
        this.resourceProcessed = {
          ...this.resource,
          themes: this.resource.themes.map(theme => ({
            ...theme,
            contents: groupedContents[theme._id],
          })),
        }
      } else {
        this.resourceProcessed = this.resource
      }
      this.assetsPreview = this.resourceProcessed.assets[0].url
      this.contentPreviewButtonText = this.resourceProcessed.assets[0].title
    }
  }

  selectThemeForContent(t) {
    this.theme = t
  }

  validResources(date, contents) {
    let flagTmp = false
    contents.map(c => {
      const dateCal = addDays(date, c.offset)
      if (format(dateCal, 'YYYY') > format(date, 'YYYY')) {
        flagTmp = true
        return false
      }
    })
    this.msgErrDatePlanning = flagTmp
  }

  closeModal() {
    this.msgErrDatePlanning = false
  }

  saveResourceSelected(res) {
    this.msgErr = ''
    this.msgErrT = ''
    this.flag = false
    const startDate = format(this.startDate, 'YYYY-MM-DD')
    const endDate = format(this.endDate, 'YYYY-MM-DD')
    const durationCustom = differenceInDays(
      parseInt(endDate, 10),
      parseInt(startDate, 10)
    )
    if (!this.startDate) {
      this.flag = true
      this.msgErr = 'Debes seleccionar una fecha'
    }
    if (res.type !== 'planning') {
      if (durationCustom < 0) {
        this.flag = true
        this.msgErr =
          'La fecha de vencimiento no puede ser inferior a la fecha de disponibilidad'
      }
      if (!this.theme) {
        this.msgErrT = 'Debes elegir un tema'
        this.flag = true
      }
    }

    if (!this.flag) {
      if (res.type !== 'planning') {
        this.data = {
          resource: [this.editObj(this.resourceProcessed)],
          theme: this.theme,
          date: this.startDate,
          idContent: this.idContent,
          duration: durationCustom > 0 ? durationCustom : 1,
          update: this.dataEditResource ? true : false,
        }
      } else {
        res.title = this.titleE ? this.titleE : this.resourceProcessed.title
        this.data = { planning: res, date: this.startDate }
      }
      this.resSelected.emit(this.data)
    }
  }

  editResourceSelected() {
    this.contentEdit = true
  }

  addTheme() {
    this.newTheme.emit(true)
  }

  editObj(res) {
    const tagsCustom = this.tagsCustom.map(name => ({ name, type: 'manual' }))
    const dataEdit = {
      abstract: this.abstractE ? this.abstractE : res.abstract,
      _id: res.id,
      previewUrl: res.previewUrl,
      processed_at: res.processed_at,
      subtitle: res.subtitle,
      tags: tagsCustom ? res.tags.concat(tagsCustom) : res.tags,
      title: this.titleE ? this.titleE : res.title,
      type: res.type,
      url: res.url,
      user: res.user,
      zipUrl: res.zipUrl,
    }
    return dataEdit
  }

  getContEje() {
    this.tagsContenido = this.resourceProcessed.tags.filter(
      tag => tag.type === 'contenido'
    )
  }

  versionView() {
    this.versionDesk = this.versionDesk ? false : true
    this.widthIframe = this.widthIframe === 100 ? 45 : 100
    this.heightIframe = this.heightIframe === 100 ? 37 : 100
    this.viewGuide = false
  }

  openGuide(url) {
    this.pdfGuide = url
    window.open(url, '_blank')
  }

  viewContentGuide(url) {
    this.pdfGuide = url
    this.viewGuide = !this.viewGuide
    this.guideView.emit(this.viewGuide)
  }

  toggleDropdown() {
    this.closeOnboarding('notShowAgain')
    this.isOpenDropdown = !this.isOpenDropdown
  }

  paginator(pags, ev) {
    if (ev === 'prev') {
      if (this.beforeP === 0) {
        this.positionAsset = 0
        this.afterP = 1
      } else {
        this.beforeP = this.beforeP - 1
        this.afterP = this.afterP - 1
        this.positionAsset = this.positionAsset - 1
      }
    } else {
      if (this.afterP === pags) {
        this.positionAsset = pags
        this.beforeP = pags - 1
        this.positionAsset = pags - 1
      } else {
        this.beforeP = this.beforeP + 1
        this.afterP = this.afterP + 1
        this.positionAsset = this.positionAsset + 1
      }
    }
  }
}
