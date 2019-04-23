import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'title'
})
export class TitlePipe implements PipeTransform {

  transform(title: string): string {
    return title.replace(/\W/g, ' ')
    .split(" ")
    .map(word =>  word.charAt(0).toUpperCase() + word.toLowerCase().slice(1))
    .join(" ");
  }

}
