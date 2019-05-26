import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { EquipamentsService } from 'src/app/core/equipaments.service';
import { Equipament } from 'src/app/core/equipament.model';

@Component({
  selector: 'app-dash-equipaments',
  templateUrl: './dash-equipaments.component.html',
  styleUrls: ['./dash-equipaments.component.scss']
})
export class DashEquipamentsComponent implements OnInit {

  equipaments: Equipament[]
  allEquipaments: Equipament[]
  equipament: Equipament
  selectedEquipament: Equipament

  locations: any = ['Unit 01', 'Unit 02', 'Unit 03', 'Unit 04', 'Unit 05']  // TODO: Add location by firebase document
  statuses: any = ['Idle ', 'In use', 'In repair']

  searchOptions: any = [
    { text: 'Uid', value: '0' },
    { text: 'Type', value: '1' },
    { text: 'Name', value: '2' },
    { text: 'Location', value: '3' },
    { text: 'Status', value: '4' }
  ]

  spinIcon: boolean

  constructor(private es: EquipamentsService) { }

  ngOnInit() {
    this.es.getAllEquipaments().subscribe(equipaments => {
      this.equipaments = equipaments
      this.allEquipaments = equipaments
    })
  }

  onCreateEquipament(form: NgForm): void {
    let newEquipament: Equipament = {
      uid: '',
      type: form.value.type,
      name: form.value.name,
      location: form.value.location,
      status: form.value.status,
    }
    this.es.createEquipament(newEquipament)
    this.resetForm(form)
  }

  onReadEquipament(form: NgForm): void {
    switch (form.value.searchOption.value) {
      case "0": { // By uid
        this.es.getEquipamentByUID(form.value.searchField).subscribe(equipaments => {
          this.equipaments = equipaments
        })
        break;
      }
      case "1": { // By type
        this.es.getEquipamentByType(form.value.searchField).subscribe(equipaments => {
          this.equipaments = equipaments
        })
        break;
      }
      case "2": { // By name
        this.es.getEquipamentByName(form.value.searchField).subscribe(equipaments => {
          this.equipaments = equipaments
        })
        break;
      }
      case "3": { // By location
        this.es.getEquipamentByLocation(form.value.searchField).subscribe(equipaments => {
          this.equipaments = equipaments
        })
        break;
      }
      case "4": { // By status
        this.es.getEquipamentByStatus(form.value.searchField).subscribe(equipaments => {
          this.equipaments = equipaments
        })
        break;
      }
      default: { // Invalid option 
        console.log("Invalid option...") // TODO: Mostrar información al usuario
        break;
      }
    }
  }

  onUpdateEquipament(form: NgForm) {
    let updatedEquipament: Equipament = {
      uid: this.selectedEquipament.uid,
      type: form.value.type,
      name: form.value.name,
      location: form.value.location,
      status: form.value.status,
    }
    this.es.updateEquipament(updatedEquipament)
  }

  onDeleteEquipament(equipament: Equipament) {
    this.es.deleteEquipament(equipament)
  }

  selectEquipament(equipament: Equipament): void {
    this.es.selectedEquipament = Object.assign({}, equipament)
    this.selectedEquipament = this.es.selectedEquipament
  }

  syncEquipaments(): void {
    this.equipaments = this.allEquipaments
  }

  resetForm(form: NgForm): void {
    form.resetForm()
  }

}
