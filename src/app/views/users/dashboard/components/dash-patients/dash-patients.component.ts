import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PatientsService } from 'src/app/core/patients.service';
import { Patient } from '../../../../../core/patient.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dash-patients',
  templateUrl: './dash-patients.component.html',
  styleUrls: ['./dash-patients.component.scss']
})
export class DashPatientsComponent implements OnInit {

  constructor(private ps: PatientsService) { }

  patients: Patient[]
  allPatients: Patient[]
  patient: Patient
  selectedPatient: Patient


  units: string[] = ['Unit 01', 'Unit 02', 'Unit 03', 'Unit 04', 'Unit 05']
  statuses: string[] = ['Status A', 'Status B', 'Status C']

  spinIcon: boolean

  ngOnInit() {
    this.ps.getAllPatients().subscribe(patients => {
      this.patients = patients
      this.allPatients = patients // Patients List Backup
    })
  }

  onCreatePatient(form: NgForm): void {
    let newPatient: Patient = {
      uid: '',
      dni: form.value.dni,
      cip: form.value.cip,
      name: form.value.name,
      lastName: form.value.lastName,
      unit: form.value.unit,
      status: form.value.status,
    }
    this.ps.createPatient(newPatient)
    this.resetForm(form)
  }

  onReadPatient(form: NgForm): void {
    switch (form.value.searchOption) {
      case "0": { // Show all users
        this.patients = this.allPatients
        break;
      }
      case "1": { // By uid
        this.ps.getPatientByUID(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "2": { // By dni
        this.ps.getPatientByDNI(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "3": { // By cip        
        this.ps.getPatientByCIP(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "4": { // By name
        this.ps.getPatientByName(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "5": { // By lastName
        this.ps.getPatientByLastName(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "6": { // By unit
        this.ps.getPatientByUnit(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "7": { // By status
        this.ps.getPatientByStatus(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      default: { // Invalid option 
        console.log("Invalid option...")
        break;
      }
    }
  }

  onUpdatePatient(form: NgForm) {
    let updatedPatient: Patient = {
      uid: this.selectedPatient.uid,
      dni: form.value.dni,
      cip: form.value.cip,
      name: form.value.name,
      lastName: form.value.lastName,
      unit: form.value.unit,
      status: form.value.status,
    }
    this.ps.updatePatient(updatedPatient)
  }

  onDeletePatient(patient: Patient) {
    this.ps.deletePatient(patient)
  }

  selectPatient(patient: Patient): void {
    this.ps.selectedPatient = Object.assign({}, patient)
    this.selectedPatient = this.ps.selectedPatient
  }

  syncPatients(): void {
    this.patients = this.allPatients
    console.log('Sync Users')
  }

  resetForm(form: NgForm): void {
    form.resetForm()
  }



}
