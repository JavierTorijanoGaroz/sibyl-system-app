import { Component, OnInit } from '@angular/core';
import { PatientsService } from 'src/app/core/patients.service';
import { Patient } from '../../../../core/patient.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-hc-patients-search',
  templateUrl: './hc-patients-search.component.html',
  styleUrls: ['./hc-patients-search.component.scss']
})
export class HcPatientsSearchComponent implements OnInit {

  patient: Patient
  flag: number
  code: string

  constructor(private ps: PatientsService) { }

  ngOnInit() {
    this.flag = -1
  }

  onReadPatient(form: NgForm): void {
    this.code = form.value.searchField
    this.ps.getPatientByPersonalCode(this.code).subscribe(patients => {
      this.patient = patients[0]
      this.flag = (this.patient === undefined) ? 0 : 1
      console.log(this.flag)
    })
  }

  clearResult(form: NgForm) {
    this.flag = -1
    form.reset()
  }
}
