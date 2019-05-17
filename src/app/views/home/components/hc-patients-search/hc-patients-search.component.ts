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
  flag: boolean

  constructor(private ps: PatientsService) { }

  ngOnInit() {
  }

  onReadPatient(form: NgForm): void {
    this.ps.getPatientByCIP(form.value.searchField).subscribe(patients => {
      this.patient = patients[0]
      this.flag = (patients) ? true : false
    }) 
  }
}
