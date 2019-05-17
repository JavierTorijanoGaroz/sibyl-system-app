import { Pipe, PipeTransform } from '@angular/core';
import { Patient } from '../../core/patient.model';

@Pipe({
  name: 'patientFilter'
})
export class PatientFilterPipe implements PipeTransform {

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
