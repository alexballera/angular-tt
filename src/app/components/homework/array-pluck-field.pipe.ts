import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'arrayPluckField',
})
export class ArrayPluckFieldPipe implements PipeTransform {
  transform(items: any[], fieldName: string): any {
    if (!items) {
      return []
    }

    if (!fieldName) {
      return items
    }

    return items.map(item => item[fieldName])
  }
}
