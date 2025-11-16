import { Pipe, PipeTransform } from '@angular/core';
import { IBourseConcours } from '../admin/bourses/bourse.model';

@Pipe({
  name: 'filterBourse',
  standalone: true,
  pure: true,
})
export class FilterBoursePipe implements PipeTransform {
  transform(bourses: IBourseConcours[] = [], searchTerm = '', filterType = ''): IBourseConcours[] {
    const term = searchTerm.toLowerCase().trim();

    return bourses.filter(b => b.titre.toLowerCase().includes(term) && (!filterType || b.type === filterType));
  }
}
