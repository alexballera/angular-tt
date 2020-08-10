import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-checkbox-list',
  templateUrl: './checkbox-list.component.html',
  styleUrls: ['./checkbox-list.component.scss'],
})
export class CheckboxListComponent implements OnInit {
  @Input() items: Array<{ title: string; data: any; checked?: boolean }>
  @Input() errorMessage: string
  @Input() disabled: boolean
  @Output() onItemSelected = new EventEmitter<any[]>()

  allSelected: boolean

  ngOnInit() {
    this.items = this.items.map(i => ({ ...i, checked: true }))
    this.checkIfAllSelected()
  }

  selectAll(checked: boolean) {
    this.items = this.items.map(i => ({ ...i, checked }))
    this.onItemSelected.emit(
      this.items.filter(i => !!i.checked).map(i => i.data)
    )
    this.allSelected = checked
  }

  checkIfAllSelected() {
    this.allSelected = this.items.every((item: any) => {
      return item.checked === true
    })
  }

  itemChange(item: any) {
    this.items = this.items.map(i => {
      if (i.data._id === item._id) {
        return {
          ...i,
          checked: !i.checked,
        }
      }
      return i
    })

    this.onItemSelected.emit(
      this.items.filter(i => !!i.checked).map(i => i.data)
    )

    this.checkIfAllSelected()
  }
}
