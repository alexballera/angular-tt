import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { Tag } from '@ticmas/common-interfaces'
import { TagsService } from '@ticmas/common-services'
import deburr from 'lodash/fp/deburr'
import flow from 'lodash/fp/flow'
import lowerCase from 'lodash/fp/lowerCase'
import sortBy from 'lodash/fp/sortBy'
import uniqBy from 'lodash/fp/uniqBy'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Component({
  selector: 'tags-select',
  templateUrl: './tags-select.component.html',
  styleUrls: ['./tags-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsSelectComponent),
      multi: true,
    },
  ],
})
export class TagsSelectComponent implements ControlValueAccessor, OnInit {
  @Input() title: string
  @Input() placeholder: string
  @Input() tags: Observable<Tag[]>
  @Input() type: string = null
  @Output() ngModelChange = new EventEmitter<any>()
  private innerValue
  private onChangeCallback: (_: any) => void

  constructor(public ts: TagsService) {}

  ngOnInit() {
    if (this.type) {
      const transforn = flow((t: any) => t.name, deburr, lowerCase)
      this.tags = this.ts.byType[this.type].pipe(
        map(uniqBy(transforn)),
        map(sortBy(transforn))
      )
    }
  }

  get value() {
    return this.innerValue
  }

  set value(data: any) {
    if (this.innerValue !== data) {
      this.innerValue = data
    }

    if (this.onChangeCallback) {
      this.onChangeCallback(this.innerValue)
    }
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn
  }

  registerOnTouched(fn: any) {
    const f = fn
  }

  setDisabledState(isDisabled: boolean) {
    const id = isDisabled
  }

  writeValue(data: any) {
    if (this.innerValue !== data) {
      this.innerValue = data
    }
  }
}
