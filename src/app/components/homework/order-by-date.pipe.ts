import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderByDate',
})
export class OrderByDatePipe implements PipeTransform {
  transform(items: any[], orderType: string, fieldName: string): any {
    if (!items) {
      return []
    }

    if (!fieldName) {
      return items
    }

    if (!orderType) {
      return items
    }

    return items.sort((a, b) =>
      orderType === 'asc'
        ? Date.parse(a[fieldName]) - Date.parse(b[fieldName])
        : Date.parse(b[fieldName]) - Date.parse(a[fieldName])
    )
  }
}
