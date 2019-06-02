import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { PatientsService } from 'src/app/core/patients.service';
import { LocationsService } from 'src/app/core/locations.service';
import { Patient } from 'src/app/core/patient.model';

const SOURCECODE: string = 'abcdefghijklmnopqrstuvwxyz0123456789';

@Component({
  selector: 'app-dash-patients',
  templateUrl: './dash-patients.component.html',
  styleUrls: ['./dash-patients.component.scss']
})
export class DashPatientsComponent implements OnInit {

  constructor(private ps: PatientsService, private ls: LocationsService) { }

  patients: Patient[]
  allPatients: Patient[]
  patient: Patient
  selectedPatient: Patient
  locations: string[] = []
  statuses: string[] = []
  defaultLocationOpt: string = ''
  defaultStatusOpt: string = ''

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
    this.initData()
  }

  async initData() {
    await this.ls.getAllLocations().subscribe(data => {
      data.forEach(element => {
        this.locations.push(element.name)
      });
      this.statuses = ['Admitted', 'Transferred', 'Discharged']
    })
    await this.ps.getAllPatients().subscribe(patients => {
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
      lastName1: form.value.lastName1,
      lastName2: form.value.lastName2,
      location: form.value.location,
      status: form.value.status,
      admissionDate: '',
      dischargeDate: '',
      personalCode: ''
    }

    if (form.value.status == 'Admitted') {
      newPatient.admissionDate = this.getCurrentDate()
      newPatient.personalCode = this.generatePersonalCode()
    }
    else if (form.value.status == 'Discharged') {
      newPatient.dischargeDate = this.getCurrentDate()
      newPatient.personalCode = ''
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
      lastName1: form.value.lastName1,
      lastName2: form.value.lastName2,
      location: form.value.location,
      status: form.value.status,
      admissionDate: form.value.admissionDate,
      dischargeDate: form.value.dischargeDate,
      personalCode: form.value.personalCode
    }

    if (form.value.status == 'Admitted') {
      updatedPatient.admissionDate = this.getCurrentDate()
      updatedPatient.dischargeDate = ''
    }
    else if (form.value.status == 'Discharged') {
      updatedPatient.dischargeDate = this.getCurrentDate()
      updatedPatient.personalCode = ''
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

  getCurrentDate(): string {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0')
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear()
    return mm + '/' + dd + '/' + yyyy;
  }


  generatePersonalCode(): string {
    return Math.random().toString(36).substr(2, 9).toLocaleUpperCase()
  }

  updatePersonalCode(): void {
    this.selectedPatient.personalCode = this.generatePersonalCode()
  }
}
