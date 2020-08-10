import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'filterName',
})
export class FilterNamePipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return []
    }
    if (!searchText) {
      return items
    }
    searchText = searchText.toLowerCase()
    return items.filter(it => {
      return (
        it.given_name.toLowerCase().includes(searchText) ||
        it.family_name.toLowerCase().includes(searchText)
      )
    })
  }
}
