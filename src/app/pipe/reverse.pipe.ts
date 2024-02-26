import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'piptransf'
})
export class ReversePipe implements PipeTransform {

  transform(value: string): string {
    return value.split('').reverse().join('');
  }

}
