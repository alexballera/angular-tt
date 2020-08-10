import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'filterTitle',
})
export class FilterTitle implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return []
    }
    if (!searchText) {
      return items
    }
    searchText = searchText.toLowerCase()
    return items.filter(it => it.title.toLowerCase().includes(searchText))
  }
}
