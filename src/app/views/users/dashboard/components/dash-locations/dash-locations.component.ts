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
    { text: 'Uid', value: '0' },
    { text: 'Name', value: '1' }
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
      name: form.value.name,
    }
    this.ls.createLocation(newLocation)
    this.resetForm(form)
  }

  onReadLocation(form: NgForm): void {
    switch (form.value.searchOption.value) {
      case "0": { // By uid
        this.ls.getLocationByUID(form.value.searchField).subscribe(locations => {
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
      default: { // Invalid option 
        console.log("Invalid option...") // TODO: Mostrar información al usuario
        break;
      }
    }
  }

  onUpdateLocation(form: NgForm) {
    let updatedLocation: Location = {
      uid: this.selectedLocation.uid,
      name: form.value.name,
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
