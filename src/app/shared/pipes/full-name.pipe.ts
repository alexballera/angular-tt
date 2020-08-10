import { Pipe, PipeTransform } from '@angular/core'
import { UserInfo } from '@ticmas/common-interfaces'
import upperFirst from 'lodash/upperFirst'

@Pipe({ name: 'fullName' })
export class FullNamePipe implements PipeTransform {
  transform(user: UserInfo): string {
    return `${user.given_name} ${user.family_name}`
      .split(' ')
      .map(upperFirst)
      .join(' ')
  }
}
