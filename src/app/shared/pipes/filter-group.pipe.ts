import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'filterGroup',
})
export class FilterGroupPipe implements PipeTransform {
  transform(items: any, searchText: string): any[] {
    if (!items) {
      return []
    }
    if (!searchText) {
      return items
    }
    searchText = searchText.toLowerCase()
    return items.filter(it => {
      return (
        it.users.filter(user => {
          return (
            user.given_name.toLowerCase().includes(searchText) ||
            user.family_name.toLowerCase().includes(searchText)
          )
        }).length > 0
      )
    })
  }
}
