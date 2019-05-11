import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../core/user.model';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  // Funciona de manera correcta, pero solo es capaz de filtrar por un campo a la vez
  // transform(users: User[], searchTerm: string) {
  //   if (!users || !searchTerm) {
  //     return users
  //   }
  //   return users.filter(user => user.name.toLocaleLowerCase().indexOf(searchTerm.toLocaleLowerCase()) !== -1)
  // }

  
  // https://stackoverflow.com/questions/50996490/filter-pipe-angular-multiple-parameters
  transform(value: any, searchTerm: any): any {
    if (!value || !searchTerm) {
      return value;
    }   
    return value.filter((data) => this.matchValue(data, searchTerm));
  }

  matchValue(data, value) {
    return Object.keys(data).map((key) => {
      return new RegExp(value, 'gi').test(data[key]);
    }).some(result => result);
  }
}
