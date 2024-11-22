import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sidebar',
  standalone: true
})
export class SidebarPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
