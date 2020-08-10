import { Pipe, PipeTransform } from '@angular/core'
@Pipe({
  name: 'filterTeacher',
})
export class FilterTeacherPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return []
    }
    if (!searchText || searchText === '') {
      return items
    }
    if (searchText.length < 3) {
      return items
    }
    searchText = searchText.toLowerCase()
    return items.filter(it => {
      const name = `${it.given_name} ${it.family_name}`
      return name && name.toLowerCase().includes(searchText)
    })
  }
}
