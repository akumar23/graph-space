import { Pipe, PipeTransform } from '@angular/core';

const milliSecDay = 1000*3600*24;

const rtf = new (Intl as any).RelativeTimeFormat('en');

@Pipe({
  name: 'relativeTime'
})
export class RelativeTimePipe implements PipeTransform {

  transform(utcTime: string): string {
    const milliSecDiff =
      new Date(utcTime).getTime() - new Date().getTime();
    const diffInDays = Math.round(milliSecDiff/milliSecDay);
    return rtf.format(diffInDays, 'day');
  }

}
