import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LocationsService } from 'src/app/core/locations.service';
import { Location } from '../../../../../core/location.model';

@Component({
  selector: 'app-dash-locations',
  templateUrl: './dash-locations.component.html',
  styleUrls: ['./dash-locations.component.scss']
})
export class DashLocationsComponent implements OnInit {

  locations: Location[]
  allLocations: Location[]
  location: Location
  selectedLocation: Location

  searchOptions: any = [
    { text: 'ID', value: '0' },
    { text: 'Name', value: '1' },
    { text: 'Zone', value: '2' }
  ]

  constructor(private ls: LocationsService) { }

  ngOnInit() {
    this.ls.getAllLocations().subscribe(locations => {
      this.locations = locations
      this.allLocations = locations
    })
  }

  onCreateLocation(form: NgForm): void {
    let newLocation: Location = {
      uid: '',
      id: form.value.id,
      name: form.value.name,
      zone: form.value.zone
    }
    this.ls.createLocation(newLocation)
    this.resetForm(form)
  }

  onReadLocation(form: NgForm): void {
    switch (form.value.searchOption.value) {
      case "0": { // By id
        this.ls.getLocationByID(form.value.searchField).subscribe(locations => {
          this.locations = locations
        })
        break;
      }
      case "1": { // By name
        this.ls.getLocationByName(form.value.searchField).subscribe(locations => {
          this.locations = locations
        })
        break;
      }
      case "2": { // By zone
        this.ls.getLocationByZone(form.value.searchField).subscribe(locations => {
          this.locations = locations
        })
        break;
      }
      default: { // Invalid option 
        console.log("Invalid option...") // TODO: Mostrar información al usuario
        break;
      }
    }
  }

  onUpdateLocation(form: NgForm) {
    let updatedLocation: Location = {
      uid: this.selectedLocation.uid,
      id: form.value.id,
      name: form.value.name,
      zone: form.value.zone
    }
    this.ls.updateLocation(updatedLocation)
  }

  onDeleteLocation(location: Location) {
    this.ls.deleteLocation(location)
  }

  selectLocation(location: Location): void {
    this.ls.selectedLocation = Object.assign({}, location)
    this.selectedLocation = this.ls.selectedLocation
  }

  syncLocations(): void {
    this.locations = this.allLocations
  }

  resetForm(form: NgForm): void {
    form.resetForm()
  }
}
