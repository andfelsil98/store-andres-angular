import { Pipe, PipeTransform } from '@angular/core';
import { formatDistance } from 'date-fns';
// este es un pipe que me dice el tiempo que ha pasado en relacion a una fecha especifica. los argumentos tendrian que ser la fecha actual y la fecha con la que quiero que compare
@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {

  transform(value: Date): string {
    return formatDistance(new Date(), value);
  }

}
