import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderByFamilyName',
})
export class OrderByFamilyName implements PipeTransform {
  transform(items: any[]): any {
    if (!items) {
      return []
    }

    const withName = items.filter(item => item.family_name)

    const withoutName = items.filter(item => !item.family_name)

    function compare(a, b) {
      const nameA = a.family_name.toUpperCase()
      const nameB = b.family_name.toUpperCase()
      let comparison = 0
      if (nameA > nameB) {
        comparison = 1
      } else if (nameA < nameB) {
        comparison = -1
      }
      return comparison
    }

    return withName.sort(compare).concat(...withoutName)
  }
}
