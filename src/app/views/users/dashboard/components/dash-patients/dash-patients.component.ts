import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PatientsService } from 'src/app/core/patients.service';
import { Patient } from 'src/app/core/patient.model';

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

  locations: any = ['Unit 01', 'Unit 02', 'Unit 03', 'Unit 04', 'Unit 05']  // TODO: Add location by firebase document
  statuses: any = ['Admitted ', 'Transferred', 'Discharged']
  
  searchOptions: any = [
    { text: 'Uid', value: '0' },
    { text: 'Dni', value: '1' },
    { text: 'Cip', value: '2' },
    { text: 'Name', value: '3' },
    { text: 'Lastname', value: '4' },
    { text: 'Location', value: '5' },
    { text: 'Status', value: '6' }
  ]

  spinIcon: boolean

  ngOnInit() {
    this.ps.getAllPatients().subscribe(patients => {
      this.patients = patients
      this.allPatients = patients
    })
  }

  onCreatePatient(form: NgForm): void {
    let newPatient: Patient = {
      uid: '',
      dni: form.value.dni,
      cip: form.value.cip,
      name: form.value.name,
      lastName: form.value.lastName,
      location: form.value.location,
      status: form.value.status,
    }
    this.ps.createPatient(newPatient)
    this.resetForm(form)
  }

  onReadPatient(form: NgForm): void {
    switch (form.value.searchOption.value) {
      case "0": { // By uid
        this.ps.getPatientByUID(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "1": { // By dni
        this.ps.getPatientByDNI(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "2": { // By cip        
        this.ps.getPatientByCIP(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "3": { // By name
        this.ps.getPatientByName(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "4": { // By lastName
        this.ps.getPatientByLastName(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "5": { // By location
        this.ps.getPatientByLocation(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      case "6": { // By status
        this.ps.getPatientByStatus(form.value.searchField).subscribe(patients => {
          this.patients = patients
        })
        break;
      }
      default: { // Invalid option 
        console.log("Invalid option...") // TODO: Mostrar información al usuario
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
      location: form.value.location,
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
  }

  resetForm(form: NgForm): void {
    form.resetForm()
  }
}
