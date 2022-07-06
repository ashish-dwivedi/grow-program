import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformToDisplayValue',
})
export class TransformToDisplayValuePipe implements PipeTransform {
  transform(value: string = '', charactersToReplace: string[] = ['-', '_']): string {
    const regex = new RegExp(`[${charactersToReplace.join('')}]`, 'gim');
    value = value?.replace(regex, ' ').toLowerCase();
    return `${value[0].toUpperCase()}${value.substring(1, value?.length)}`;
  }
}
