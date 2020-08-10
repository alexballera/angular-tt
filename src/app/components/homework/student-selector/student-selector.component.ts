import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'

@Component({
  selector: 'app-student-selector',
  templateUrl: './student-selector.component.html',
  styleUrls: ['./student-selector.component.scss'],
})
export class StudentSelectorComponent implements OnInit {
  @Input() students: Array<{ text: string; key: string | number }>
  @Input() selectedItem: string | number
  @Output() onItemChange = new EventEmitter<string | number>()

  currentIndex: number

  ngOnInit() {
    this.setCurrentIndex()
  }

  onSelectedChange(item: string | number) {
    this.onItemChange.emit(item)
    this.setCurrentIndex()
  }

  setCurrentIndex() {
    this.currentIndex = this.students.findIndex(
      student => student.key === this.selectedItem
    )
  }

  updateSelection() {
    this.selectedItem = this.students.find(
      (student, index) => index === this.currentIndex
    ).key
    this.onItemChange.emit(this.selectedItem)
  }

  prev() {
    this.currentIndex--
    this.updateSelection()
  }

  next() {
    this.currentIndex++
    this.updateSelection()
  }
}
