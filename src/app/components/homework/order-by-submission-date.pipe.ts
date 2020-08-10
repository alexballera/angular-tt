import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'orderBySubmissionDate',
})
export class OrderBySubmissionDatePipe implements PipeTransform {
  transform(items: any[], orderType: string): any {
    if (!items) {
      return []
    }

    if (!orderType) {
      return items
    }

    const withDate = items.filter(item => item.submissions.length)

    const withoutDate = items.filter(item => !item.submissions.length)

    return withDate
      .sort((a, b) =>
        orderType === 'asc'
          ? Date.parse(a.submissions.slice(-1).pop().createdAt) -
            Date.parse(b.submissions.slice(-1).pop().createdAt)
          : Date.parse(b.submissions.slice(-1).pop().createdAt) -
            Date.parse(a.submissions.slice(-1).pop().createdAt)
      )
      .concat(...withoutDate)
  }
}
