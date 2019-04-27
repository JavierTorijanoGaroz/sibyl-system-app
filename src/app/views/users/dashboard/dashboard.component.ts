import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  appTitle: string = "Sibyl System";
  userName: string = "Nombre de usuario"; // TODO: Recuperar nombre del actual usuario autentificado
  isAdmin: boolean = false ; // TODO: Recuperar permisos del usuario autentificado
  toggledClassApplied: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toggledClass() {
    this.toggledClassApplied = !this.toggledClassApplied;
  }

}
