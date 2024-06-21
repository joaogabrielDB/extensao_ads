import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(dateString: string): string {
    if (!dateString) {
        return ''; 
    }
    const dateParts = dateString.split('/');
    const formattedDateParts = [dateParts[2], dateParts[1], dateParts[0]];
    const formattedDateString = formattedDateParts.join('/');

    return formattedDateString;
  }
}