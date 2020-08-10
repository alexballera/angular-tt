import { Pipe, PipeTransform } from '@angular/core'
@Pipe({ name: 'levelSplit' })
export class LevelPipe implements PipeTransform {
  transform(level: string): string {
    return level.split('-')[0].trim()
  }
}
