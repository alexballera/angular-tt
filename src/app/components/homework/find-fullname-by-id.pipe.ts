import { Pipe, PipeTransform } from '@angular/core'
import upperFirst from 'lodash/upperFirst'

@Pipe({
  name: 'findFullNameById',
})
export class FindFullNameByIdPipe implements PipeTransform {
  transform(id: string, data: any[]): string {
    if (!data) {
      return id
    }

    const item = data.find(it => it.id === id)

    return `${item.given_name} ${item.family_name}`
      .split(' ')
      .map(upperFirst)
      .join(' ')
  }
}
