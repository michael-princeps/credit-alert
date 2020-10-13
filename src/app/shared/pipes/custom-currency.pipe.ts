import { formatCurrency } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customCurrency'
})
export class CustomCurrencyPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${Number(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} <b>NGN</b>`;
  }

}
