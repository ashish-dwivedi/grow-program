import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformSpanToDays'
})
export class TransformSpanToDaysPipe implements PipeTransform {

  transform(value: number = 0): unknown {
    return Number(value) / 2 || 0;
  }

}
