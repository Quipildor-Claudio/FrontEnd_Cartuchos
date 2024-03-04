import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeSolicitud',
  standalone: true
})
export class PipeSolicitudPipe implements PipeTransform {

  transform(value:any, ...args:any): any {
    return null;
  }

}
